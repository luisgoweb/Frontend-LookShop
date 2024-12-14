import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Asegúrate de importar el contexto
import '../styles/Messages.css';

const Messages = () => {
  const { user } = useContext(AppContext); // Obtener el usuario desde el contexto
  const navigate = useNavigate();

  const mensajes = [
    { id: 1, remitente: 'Usuario 1', mensaje: 'Hola, me interesa tu prenda', fecha: '29/11/2024' },
    { id: 2, remitente: 'Usuario 2', mensaje: '¿Podemos coordinar una entrega?', fecha: '28/11/2024' },
    { id: 3, remitente: 'Usuario 3', mensaje: '¿Está disponible la prenda?', fecha: '27/11/2024' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between p-3 header">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img src="https://i.imgur.com/zJhruFi.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="header-user-info">
          <span>{user ? `Hola, ${user.username}!` : 'Hola, Usuario!'}</span> {/* Saludo dinámico */}
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <div className="d-flex">
        <aside>
          <Link to="/productos-privado">
            <button className="aside-button">
              <i className="fas fa-tshirt"></i>
              Productos
            </button>
          </Link>
          <div className="aside-divider"></div>
          <Link to="/favoritos">
            <button className="aside-button">
              <i className="fas fa-heart"></i>
              Favoritos
            </button>
          </Link>
          <Link to="/mensajes">
            <button className="aside-button active">
              <i className="fas fa-comments"></i>
              Mensajes
            </button>
          </Link>
          <div className="aside-divider"></div>
          <Link to="/subir-publicacion">
            <button className="aside-button">
              <i className="fas fa-upload"></i>
              Publicar
            </button>
          </Link>
          <Link to="/mi-usuario">
            <button className="aside-button">
              <i className="fas fa-user"></i>
              Mi Usuario
            </button>
          </Link>
        </aside>
        <main className="flex-grow-1">
          <div className="messages-container">
            <h1>Tus Mensajes</h1>
            <div className="messages-list">
              {mensajes.map((mensaje) => (
                <div className="message-card" key={mensaje.id}>
                  <h4 className="message-sender">{mensaje.remitente}</h4>
                  <p className="message-text">{mensaje.mensaje}</p>
                  <span className="message-date">{mensaje.fecha}</span>
                  <Link
                    to={`/producto-privado/${mensaje.id}`}
                    className="btn btn-outline-dark message-button"
                  >
                    Responder
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
