import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cats from './pages/Cats';
import Pets from './pages/Pets';
import Adoption from './pages/Adoption';
import PetDetail from './pages/PetDetail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/pet/:type/:id" element={<PetDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;