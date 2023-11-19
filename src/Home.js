import React, { useEffect, useState } from "react";
import { app } from "../src/database/fb"; // Asegúrate de que esta ruta sea correcta
import { useNavigate } from 'react-router-dom';
import "../src/css/home.css";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [esAdmin, setEsAdmin] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarRol = async () => {
      const db = getFirestore(app);
      const user = app.auth().currentUser;

      if (user) {
        const usuariosRef = collection(db, "usuarios");
        const q = query(usuariosRef, where("Email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // Asumiendo que el campo de rol es 'Rol'
          if (doc.data().Rol === 'admin') {
            setEsAdmin(true);
          } else {
            navigate("/login"); // o cualquier otra ruta para usuarios no administradores
          }
        });
        setCargando(false);
      }
    };

    verificarRol();
  }, [navigate]);

  useEffect(() => {
    if (esAdmin) {
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

      obtenerUsuarios();
    }
  }, [esAdmin]);

  const cerrarSesion = () => {
    app.auth().signOut().then(() => {
      navigate("/login");
    });
  };

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1>Bienvenido al Panel de Administración</h1>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </header>
      <main className="inbox">
        <h2>Lista de Usuarios:</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Rol</th>
              <th>Contraseña</th> {/* No se recomienda mostrar o almacenar contraseñas */}
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.Email}</td>
                <td>{usuario.Rol}</td>
                <td>{usuario.Contraseña}</td> {/* Esto debería eliminarse por seguridad */}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;

