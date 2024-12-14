import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <img src="https://i.imgur.com/zJhruFi.png" alt="LookShop Logo" className="home-logo" />
            <div className="home-buttons-container">
                <Link to="/ingresa">
                    <button className="home-button">Ingresa</button>
                </Link>
                <Link to="/registro">
                    <button className="home-button">Regístrate</button>
                </Link>
            </div>
            <Link to="/productos">
                <button className="home-large-button"><span>Ver Productos</span></button>
            </Link>
        </div>
    );
};

export default Home;
