import React, { useState } from "react";
import { app } from "./database/fb";
import "../src/css/styles.css";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [errorMensaje, setErrorMensaje] = useState("");
  const [camposVaciosError, setCamposVaciosError] = useState(false);

  const iniciarSesion = (correo, password) => {
    app
      .auth()
      .signInWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("Sesión iniciada con:", usuarioFirebase.user);
        props.setUsuario(usuarioFirebase);

        usuarioFirebase.user.getIdToken().then((token) => {
          console.log("Token de usuario:", token);
        });
        navigate('/home');
      })
      .catch((error) => {
        setErrorMensaje("Ha ocurrido un problema al iniciar sesión. Intenta de nuevo.");
        console.error("Error al iniciar sesión:", error.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;

    // Validar campos vacíos
    if (!correo || !password) {
      setCamposVaciosError(true);
      setErrorMensaje("Ambos campos son obligatorios. Por favor, completa todos los campos.");
      return;
    }

    // Limpiar mensajes de error y advertencias
    setCamposVaciosError(false);
    setErrorMensaje("");

    // Solo iniciar sesión, no hay lógica para crear un nuevo usuario aquí.
    iniciarSesion(correo, password);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>Login de Administracion</span></div>
        <form onSubmit={submitHandler}>
          <div className="row">
            <input type="email" id="emailField" placeholder="Email o usuario" required />
          </div>
          <div className="row">
            <input type="password" id="passwordField" placeholder="Contraseña" required />
          </div>
            <center>
              <button type="submit">Inicia sesión</button>
            </center>
        </form>
        <center>
        <span>
          {camposVaciosError && <p style={{ color: "yellow" }}>Completa todos los campos antes de enviar el formulario.</p>}
          {errorMensaje && <p style={{ color: "red" }}>{errorMensaje}</p>}
        </span>
        </center>

      </div>
    </div>
  );
};

export default Login;
