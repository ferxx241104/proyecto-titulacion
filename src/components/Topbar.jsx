import React from "react";

function Topbar({ usuario, cerrarSesion, seccionActiva }) {
  const obtenerTitulo = () => {
    switch (seccionActiva) {
      case "inicio":
        return "Dashboard";
      case "registro":
        return "Registro de Alumnos";
      case "consultas":
        return "Consultas de Alumnos";
      case "docentes":
        return "Docentes de la División";
      case "historial":
        return "Historial de Cambios";
      case "usuario":
        return "Agregar Nuevo Usuario";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="topbar">
      <div>
        <h1>{obtenerTitulo()}</h1>
        <p>
          Bienvenido al Proceso de Titulación,{" "}
          {usuario ? usuario.nombre : "Usuario"}
        </p>
      </div>

      <button className="logout-button" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </header>
  );
}

export default Topbar;