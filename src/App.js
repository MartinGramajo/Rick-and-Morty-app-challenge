import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonajePageDetalle from './pages/PersonajePageDetalle';
import NavReact from './components/NavReact';
import { useState } from 'react';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <BrowserRouter>
      <NavReact />
      <Routes>
        <Route
          path="/"
          element={<Home loading={loading} setLoading={setLoading} />} />
          <Route path="/character/:id" element={<PersonajePageDetalle loading={loading} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
