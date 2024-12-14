import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');  // Para el mensaje de éxito
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData);

      // Almacenar el token en localStorage
      localStorage.setItem('token', response.data.token);

      // Limpiar el formulario
      setFormData({
        email: '',
        username: '',
        password: '',
      });

      // Mostrar mensaje de éxito
      setSuccessMessage('¡Registro exitoso! Redirigiendo...');

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/productos-privado');
      }, 2000);
      
    } catch (error) {
      console.error('Error al registrarse:', error.response?.data || error.message);
      setSuccessMessage('Hubo un error al registrar el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between p-3 header">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img src="https://i.imgur.com/zJhruFi.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="header-buttons-container">
          <Link to="/ingresa" className="home-button">Ingresa</Link>
          <Link to="/registro" className="home-button">Regístrate</Link>
        </div>
      </header>

      <main className="d-flex justify-content-center align-items-center register-page-container">
        <div className="register-form-wrapper">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Crear una cuenta</h1>

            {/* Mensaje de éxito o error */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Ingrese su email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Ingrese su nombre de usuario"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-3">Registrarme</button>

            <p className="text-center mt-3">
              <div className='text_form_bottom'> ¿Ya tienes una cuenta? </div> 
              <Link to="/ingresa" className="text-link">Ingresa aquí</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
