import React, { useEffect, useState } from "react";
import { app } from "../src/database/fb";
import { useNavigate } from 'react-router-dom';
import "../src/css/home.css";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Función para obtener la colección "usuarios"
    const obtenerUsuarios = async () => {
      try {
        const db = getFirestore(app);
        const usuariosSnapshot = await getDocs(collection(db, "usuarios"));
        const listaUsuarios = usuariosSnapshot.docs.map((doc) => doc.data());
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Error al obtener la colección de usuarios", error);
      }
    };

    // Llamada a la función para obtener usuarios al cargar el componente
    obtenerUsuarios();
  }, []);

  const cerrarSesion = () => {
    app.auth().signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Bienvenido, sesión iniciada.</h1>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </header>
      <main className="inbox">
        <h2>Lista de Usuarios:</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.Email}</td>
                <td>{usuario.Contraseña}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;

