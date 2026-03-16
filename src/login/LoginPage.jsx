import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();

    if (!nombre || !password) {
      setMensaje("Completa todos los campos");
      return;
    }

    try {
      const respuesta = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          password,
        }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(`Bienvenido ${data.usuario.nombre}`);

        // Guardar usuario si quieres usarlo después
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // Redirigir al dashboard
        navigate("/dashboard");
      } else {
        setMensaje(data.mensaje);
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="left-panel">
          <div className="overlay">
            <h1>Bienvenido al Proceso de Titulación</h1>
            <p>Inicia sesión para continuar</p>
          </div>
        </div>

        <div className="right-panel">
          <form className="login-form" onSubmit={manejarLogin}>
            <h2>Iniciar Sesión</h2>

            <input
              type="text"
              placeholder="Usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <input 
              type="password" // Cambié el tipo a "password" para ocultar la contraseña al escribir
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Agregué un manejador de cambio para actualizar el estado de la contraseña a medida que el usuario escribe
            />

            <button type="submit">Ingresar</button>

            <p>{mensaje}</p> 
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;