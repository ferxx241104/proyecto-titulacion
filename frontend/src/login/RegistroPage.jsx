import { useState } from "react";

function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarRegistro = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://127.0.0.1:5000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          password
        })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setMensaje("Usuario registrado correctamente");
        setNombre("");
        setPassword("");
      } else {
        setMensaje(data.mensaje);
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <form onSubmit={manejarRegistro}>
      <h2>Registro</h2>

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Registrarse</button>

      <p>{mensaje}</p>
    </form>
  );
}

export default RegistroPage;