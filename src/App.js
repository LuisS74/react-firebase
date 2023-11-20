import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { app } from "./database/fb";
import Home from "./Home";
import Logueo from "./Login";
import Registro from "./Registration";
import Bienvenida from "./Bienvenida";
import Navbar from "./Navbar";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(async (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
      if (usuarioFirebase) {
        const db = getFirestore(app);
        const q = query(collection(db, "usuarios"), where("Email", "==", usuarioFirebase.email));
        const querySnapshot = await getDocs(q);
        const usuarioDatos = querySnapshot.docs[0]?.data();
        if (usuarioDatos) {
          setRol(usuarioDatos.Rol); 
        }
      } else {
        setRol(null);
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <Router>
      <Navbar usuario={usuario} rol={rol} />
      <Routes>
        <Route path="/login" element={usuario ? <Navigate to="/home" /> : <Logueo setUsuario={setUsuario} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/home" element={usuario ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={usuario ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
