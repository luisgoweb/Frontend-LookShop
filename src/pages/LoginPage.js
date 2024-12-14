import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Asegúrate de importar Link aquí
import { AppContext } from '../context/AppContext'; 
import '../styles/LoginPage.css';

const LoginPage = () => {
  const { setUser } = useContext(AppContext);  // Accedemos a setUser del contexto
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Para mostrar mensajes de error
  const [successMessage, setSuccessMessage] = useState('');  // Para el mensaje de éxito
  
  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, ingresa ambos campos.');
      return;
    }

    
    const user = { username: email.split('@')[0] }; // Tomamos la parte antes del '@' como nombre de usuario
    setUser(user);  // Actualizamos el contexto con el usuario

    setSuccessMessage(`¡Bienvenido ${user.username}!`);  // Establecemos el mensaje de éxito
    setTimeout(() => {
      setSuccessMessage('');  // Limpiamos el mensaje de éxito después de un tiempo
    }, 3000);

    navigate('/productos-privado');  // Redirigimos a la página de productos privados
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

      <main className="d-flex justify-content-center align-items-center login-page-container">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            <h1 className="form-title">Iniciar Sesión</h1>

            {/* Mensaje de error si lo hay */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Mensaje de éxito si lo hay */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Ingresa tu email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-3">
              Iniciar Sesión
            </button>

            {/* Mensaje debajo del formulario */}
            <div className="form-footer">
              <p className="text-center mt-3">
                ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
