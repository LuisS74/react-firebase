import React from "react";
import { app } from "./database/fb"; 
import { useNavigate } from 'react-router-dom';

const Bienvenida = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    app.auth().signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="bienvenida-container">
      <h1>Bienvenido a la Aplicación</h1>
      <p>¡Te has registrado exitosamente!</p>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  );
};

export default Bienvenida;
