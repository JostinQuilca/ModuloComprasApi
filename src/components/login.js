import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Proveedores from './components/Proveedores';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/" element={<h1>Bienvenido a la Gestión de Aplicaciones</h1>} />
      </Routes>
    </Router>
  );
}

export default App;