import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { app } from "./database/fb";
import Home from "./Home";
import Logueo from "./Login";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((usuarioFirebase) => {
      console.log("ya tienes sesión iniciada con:", usuarioFirebase);
      setUsuario(usuarioFirebase);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={usuario ? <Navigate to="/home" /> : <Logueo setUsuario={setUsuario} />} />
        <Route path="/home" element={usuario ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={usuario ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;