import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonajePageDetalle from './pages/PersonajePageDetalle';
import NavReact from './components/NavReact';
import Footer from './components/Footer';
import Favorites from './pages/Favorites';
import { useContext, useState } from 'react';
import { FavoritesContext } from './context/FavoritesContext';
import NotFound from './pages/NotFound';


function App() {
  const [loading, setLoading] = useState(false);
  const {favorites} = useContext(FavoritesContext)
  

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <NavReact favorites={favorites} />
        <Routes>
          <Route
            path="/"
            element={<Home loading={loading} setLoading={setLoading} />} />
          <Route path="/character/:id" element={<PersonajePageDetalle loading={loading} />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
