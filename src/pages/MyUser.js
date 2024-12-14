import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MyUser.css';

const MyUser = () => {
  const navigate = useNavigate();

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
          <span>Hola, Usuario!</span>
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
            <button className="aside-button">
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
            <button className="aside-button active">
              <i className="fas fa-user"></i>
              Mi Usuario
            </button>
          </Link>
        </aside>
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="my-user-container">
            <div className="profile-section">
              <div className="profile-picture">Foto de perfil</div>
              <button className="upload-photo-button">Sube una nueva foto de Perfil</button>
            </div>
            <div className="user-details-form">
              <div className="form-field">
                <label>Nombre de Usuario</label>
                <input type="text" placeholder="Escribe tu nombre de usuario" />
              </div>
              <div className="form-field">
                <label>Contacto</label>
                <input type="text" placeholder="Escribe tu información de contacto" />
              </div>
              <div className="form-field">
                <label>Cambiar Contraseña</label>
                <input type="password" placeholder="Escribe tu nueva contraseña" />
              </div>
              <button className="save-button">Guardar Cambios</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyUser;
