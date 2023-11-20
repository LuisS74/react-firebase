import React, { useState } from "react";
import { app } from "./database/fb"; 
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Registro = () => {
  const navigate = useNavigate();
  const [errorMensaje, setErrorMensaje] = useState("");

  const registrarUsuario = (correo, password) => {
    app.auth()
      .createUserWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        const db = getFirestore(app);
        addDoc(collection(db, "usuarios"), {
          Email: correo,
          Rol: 'usuario', 
          Contraseña: password
        })
        .then(() => {
          console.log("Usuario registrado en Firestore");
          navigate('/bienvenida');
        })
        .catch((error) => {
          console.error("Error al guardar usuario en Firestore:", error.message);
          setErrorMensaje("Error al guardar usuario en Firestore: " + error.message);
        });
      })
      .catch((error) => {
        setErrorMensaje("Error al registrar usuario: " + error.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;
    registrarUsuario(correo, password);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>Registro de Usuarios</span></div>
        <form onSubmit={submitHandler}>
          <div className="row">
            <input type="email" id="emailField" name="emailField" placeholder="Email" required />
          </div>
          <div className="row">
            <input type="password" id="passwordField" name="passwordField" placeholder="Contraseña" required />
          </div>
          <div className="row">
            <center>
              <button type="submit">Registrar</button>
            </center>
          </div>
          <div className="row">
            <center>
              {errorMensaje && <p style={{ color: "red" }}>{errorMensaje}</p>}
            </center>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;


