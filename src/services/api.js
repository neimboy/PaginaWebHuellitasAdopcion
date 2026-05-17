import axios from 'axios';

// ─── Configuración centralizada ───────────────────────────────────────────────

const CONFIG = {
  catApi: {
    baseURL: 'https://api.thecatapi.com/v1',
    apiKey: import.meta.env.VITE_CAT_API_KEY ?? 'DEMO-API-KEY',
  },
  dogApi: {
    baseURL: 'https://dog.ceo/api',
  },
  defaults: {
    limit: 10,
    retries: 2,
    retryDelay: 500, // ms
  },
};

// ─── Clientes HTTP ────────────────────────────────────────────────────────────

const catClient = axios.create({
  baseURL: CONFIG.catApi.baseURL,
  headers: { 'x-api-key': CONFIG.catApi.apiKey },
});

const dogClient = axios.create({
  baseURL: CONFIG.dogApi.baseURL,
});

// ─── Utilidades ───────────────────────────────────────────────────────────────

/**
 * Reintenta una función async hasta `retries` veces con backoff lineal.
 * @template T
 * @param {() => Promise<T>} fn
 * @param {number} retries
 * @param {number} delay
 * @returns {Promise<T>}
 */
async function withRetry(fn, retries = CONFIG.defaults.retries, delay = CONFIG.defaults.retryDelay) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, delay * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

/**
 * Extrae la raza del path de una URL de dog.ceo.
 * Ejemplo: ".../breeds/labrador/images/1.jpg" → "labrador"
 * @param {string} url
 * @returns {string}
 */
function extractBreedFromDogUrl(url) {
  try {
    const parts = new URL(url).pathname.split('/');
    const breedsIndex = parts.indexOf('breeds');
    return breedsIndex !== -1 ? parts[breedsIndex + 1] : 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Genera un número pseudo-aleatorio determinista basado en una semilla.
 * Evita inconsistencias entre renders.
 * @param {string|number} seed
 * @param {number} max
 * @returns {number}
 */
function seededRandom(seed, max) {
  const hash = String(seed).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return hash % max;
}

/**
 * Asigna un nombre determinista a partir de un identificador único.
 * Mismo id → mismo nombre en cada render.
 * @param {string[]} pool
 * @param {string|number} id
 * @returns {string}
 */
function pickName(pool, id) {
  return pool[seededRandom(id, pool.length)];
}

// ─── Nombres aleatorios ───────────────────────────────────────────────────────

const CAT_NAMES = [
  'Michi', 'Luna', 'Nala', 'Simba', 'Cleo', 'Oreo', 'Milo', 'Loki',
  'Salem', 'Whisker', 'Pippin', 'Sombra', 'Tigre', 'Isis',
  'Felix', 'Mora', 'Canela', 'Zeus', 'Perla', 'Gizmo',
];

const DOG_NAMES = [
  'Max', 'Bella', 'Rocky', 'Coco', 'Thor', 'Lola', 'Bruno', 'Nina',
  'Toby', 'Laika', 'Dante', 'Kira', 'Boby', 'Sasha', 'Rex',
  'Nube', 'Chispa', 'Apolo', 'Frida', 'Duque',
];

// ─── Cache simple en memoria ──────────────────────────────────────────────────

const cache = new Map();

/**
 * @param {string} key
 * @param {() => Promise<any>} fetcher
 * @param {number} ttl - tiempo de vida en ms (default 60 s)
 */
async function cachedFetch(key, fetcher, ttl = 60_000) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// ─── API de Gatos ─────────────────────────────────────────────────────────────

/**
 * Obtiene una lista de gatos aleatorios con información de raza y nombre asignado.
 * @param {number} limit
 * @returns {Promise<CatImage[]>}
 */
export const getRandomCats = (limit = CONFIG.defaults.limit) =>
  withRetry(async () => {
    const { data } = await catClient.get('/images/search', {
      params: { limit, size: 'med', has_breeds: true },
    });
    return data.map((cat) => ({
      ...cat,
      name: pickName(CAT_NAMES, cat.id),
    }));
  });

/**
 * Obtiene un gato por su ID.
 * @param {string} id
 * @returns {Promise<CatImage | null>}
 */
export const getCatById = async (id) => {
  if (!id) return null;
  return withRetry(async () => {
    const { data } = await catClient.get(`/images/${id}`);
    return {
      ...data,
      name: pickName(CAT_NAMES, data.id),
    };
  }).catch((error) => {
    console.error(`[getCatById] id=${id}`, error.message);
    return null;
  });
};

// ─── API de Perros ────────────────────────────────────────────────────────────

/**
 * Obtiene una lista de perros aleatorios con nombre asignado.
 * Usa el endpoint batch para reducir el número de requests.
 * @param {number} limit
 * @returns {Promise<DogImage[]>}
 */
export const getRandomDogs = (limit = CONFIG.defaults.limit) =>
  withRetry(async () => {
    const { data } = await dogClient.get(`/breeds/image/random/${limit}`);

    // dog.ceo devuelve array cuando limit > 1, string cuando limit === 1
    const messages = Array.isArray(data.message) ? data.message : [data.message];

    return messages.map((url) => {
      const id = url.split('/').pop().replace(/\.[^.]+$/, '');
      return {
        url,
        id,
        breed: extractBreedFromDogUrl(url),
        name: pickName(DOG_NAMES, id),
      };
    });
  });

/**
 * Obtiene una imagen aleatoria de una raza específica de perro.
 * @param {string} breed - Puede ser "labrador" o "retriever/golden"
 * @returns {Promise<DogImage | null>}
 */
export const getDogByBreed = async (breed) => {
  if (!breed) return null;
  const path = breed.includes('/') ? breed : `${breed}`;
  return withRetry(async () => {
    const { data } = await dogClient.get(`/breed/${path}/images/random`);
    const id = data.message.split('/').pop().replace(/\.[^.]+$/, '');
    return {
      url: data.message,
      id,
      breed,
      name: pickName(DOG_NAMES, id),
    };
  }).catch((error) => {
    console.error(`[getDogByBreed] breed=${breed}`, error.message);
    return null;
  });
};

// ─── API de Razas de Gatos ────────────────────────────────────────────────────

/**
 * Obtiene todas las razas de gatos disponibles (con caché de 5 minutos).
 * @returns {Promise<CatBreed[]>}
 */
export const getCatBreeds = () =>
  cachedFetch(
    'cat-breeds',
    () =>
      withRetry(async () => {
        const { data } = await catClient.get('/breeds');
        return data;
      }),
    5 * 60_000,
  );

// ─── Datos de Adopción ────────────────────────────────────────────────────────

/** @type {AdoptionPet[]} */
const ADOPTION_PETS = [
  {
    id: 1,
    name: 'Luna',
    type: 'cat',
    age: '2 meses',
    breed: 'Siamés',
    gender: 'Hembra',
    description: 'Juguetona y cariñosa, busca un hogar lleno de amor',
    imageUrl: 'https://cdn2.thecatapi.com/images/abe.jpg',
  },
  {
    id: 2,
    name: 'Max',
    type: 'dog',
    age: '1 año',
    breed: 'Labrador',
    gender: 'Macho',
    description: 'Leal y enérgico, perfecto para familias activas',
    imageUrl: 'https://images.dog.ceo/breeds/labrador/n02099712_4323.jpg',
  },
  {
    id: 3,
    name: 'Coco',
    type: 'cat',
    age: '6 meses',
    breed: 'Persa',
    gender: 'Macho',
    description: 'Tranquilo y mimoso, ideal para departamentos',
    imageUrl: 'https://cdn2.thecatapi.com/images/KMpyhO-lm.jpg',
  },
  {
    id: 4,
    name: 'Bella',
    type: 'dog',
    age: '3 meses',
    breed: 'Golden Retriever',
    gender: 'Hembra',
    description: 'Dulce y amigable, se lleva bien con niños',
    imageUrl: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_2330.jpg',
  },
];

/** @returns {AdoptionPet[]} */
export const getAdoptionPets = () => ADOPTION_PETS;

// ─── Detalles enriquecidos de mascotas ───────────────────────────────────────

const PERSONALITIES = ['Juguetón', 'Tranquilo', 'Cariñoso', 'Independiente', 'Curioso', 'Protector'];
const HEALTH_STATUS = ['Vacunado', 'Esterilizado', 'Desparasitado'];
const COMPATIBILITY = ['Niños', 'Otros gatos', 'Perros', 'Personas mayores'];
const ADJECTIVES = ['juguetón', 'cariñoso', 'tranquilo', 'sociable'];
const SIZES = ['Pequeño', 'Mediano', 'Grande'];

/**
 * Enriquece una mascota con detalles adicionales de forma determinista
 * (mismo resultado para el mismo `pet.id` en cada render).
 *
 * @param {AdoptionPet} pet
 * @returns {EnrichedPet}
 */
export const generatePetDetails = (pet) => {
  const seed = pet.id;

  const personality = PERSONALITIES[seededRandom(seed, PERSONALITIES.length)];
  const healthCount = (seededRandom(seed + 1, 3)) + 1;
  const compatCount = (seededRandom(seed + 2, 2)) + 1;
  const adjective = ADJECTIVES[seededRandom(seed + 3, ADJECTIVES.length)];
  const size = SIZES[seededRandom(seed + 4, SIZES.length)];
  const energyLevel = (seededRandom(seed + 5, 5)) + 1;

  const daysAgo = (seed * 7) % 90 || 1;
  const arrivalDate = new Date(Date.now() - daysAgo * 86_400_000).toLocaleDateString('es-PE');

  return {
    ...pet,
    personality,
    health: HEALTH_STATUS.slice(0, healthCount),
    compatibility: COMPATIBILITY.slice(0, compatCount),
    story: `${pet.name} fue rescatado/a de las calles y ahora busca un hogar lleno de amor. Es muy ${adjective} y se adapta fácilmente a nuevos ambientes.`,
    arrivalDate,
    energyLevel,
    size,
  };
};

// ─── JSDoc types ──────────────────────────────────────────────────────────────

/**
 * @typedef {{ id: string; url: string; name: string; breeds?: object[] }} CatImage
 * @typedef {{ url: string; id: string; breed: string; name: string }} DogImage
 * @typedef {{ id: string; name: string; temperament?: string }} CatBreed
 * @typedef {{ id: number; name: string; type: 'cat'|'dog'; age: string; breed: string; gender: string; description: string; imageUrl: string }} AdoptionPet
 * @typedef {AdoptionPet & { personality: string; health: string[]; compatibility: string[]; story: string; arrivalDate: string; energyLevel: number; size: string }} EnrichedPet
 */