import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from './database/fb'; 

const Navbar = ({ usuario, rol }) => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    app.auth().signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <nav>
      <ul>
        {usuario && rol === 'admin' && (
          <>
           <li><Link to="/bienvenida">Home</Link></li>
            <li><Link to="/home">Panel Administración</Link></li>
            <li><button onClick={cerrarSesion}>Cerrar Sesión</button></li>
          </>
        )}
        {usuario && rol !== 'admin' && (
          <>
            <li><Link to="/bienvenida">Home</Link></li>
            <li><button onClick={cerrarSesion}>Cerrar Sesión</button></li>
          </>
        )}
        {!usuario && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
