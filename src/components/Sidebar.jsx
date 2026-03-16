import React from "react";

function Sidebar({ seccionActiva, setSeccionActiva }) {
  return (
    <aside className="sidebar">
      <h2 className="Logo">Proceso de Titulación</h2>

      <ul className="menu">
        <li
          className={seccionActiva === "inicio" ? "active" : ""}
          onClick={() => setSeccionActiva("inicio")}
        >
          Inicio
        </li>

        <li
          className={seccionActiva === "registro" ? "active" : ""}
          onClick={() => setSeccionActiva("registro")}
        >
          Registro de Alumnos
        </li>

        <li
          className={seccionActiva === "consultas" ? "active" : ""}
          onClick={() => setSeccionActiva("consultas")}
        >
          Consultas de Alumnos
        </li>

        <li
          className={seccionActiva === "docentes" ? "active" : ""}
          onClick={() => setSeccionActiva("docentes")}
        >
          Docentes de la División
        </li>

        <li
          className={seccionActiva === "historial" ? "active" : ""}
          onClick={() => setSeccionActiva("historial")}
        >
          Historial de Cambios
        </li>

        <li
          className={seccionActiva === "usuario" ? "active" : ""}
          onClick={() => setSeccionActiva("usuario")}
        >
          Agregar Nuevo Usuario
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;