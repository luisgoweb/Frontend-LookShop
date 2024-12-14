import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductDetailPrivate from './pages/ProductDetailPrivate'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPrivate from './pages/ProductsPrivate';
import UploadPublication from './pages/UploadPublication';
import MyUser from './pages/MyUser'; 
import Favorites from './pages/Favorites';
import Messages from './pages/Messages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/producto-privado/:id" element={<ProductDetailPrivate />} /> 
        <Route path="/ingresa" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/productos-privado" element={<ProductsPrivate />} />
        <Route path="/subir-publicacion" element={<UploadPublication />} />
        <Route path="/mi-usuario" element={<MyUser />} /> 
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/mensajes" element={<Messages />} /> 
      </Routes>
    </Router>
  );
};

export default App;
