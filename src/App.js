import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersonajePageDetalle from './pages/PersonajePageDetalle';
import NavReact from './components/NavReact';

function App() {
  return (
    <BrowserRouter>
      <NavReact />
      <Routes>
        <Route
          path="/"
          element={<Home />} />
          <Route path="/character/:id" element={<PersonajePageDetalle />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
