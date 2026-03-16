import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import DashboardHome from "../components/dashboard/DashboardHome";
import RegistroAlumnos from "../components/dashboard/RegistroAlumnos";
import ConsultasAlumnos from "../components/dashboard/ConsultasAlumnos";
import DocentesDivision from "../components/dashboard/DocentesDivision";
import HistorialCambios from "../components/dashboard/HistorialCambios";
import AgregarUsuario from "../components/dashboard/AgregarUsuario";

import "../css/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [seccionActiva, setSeccionActiva] = useState("inicio");

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const renderContenido = () => {
    switch (seccionActiva) {
      case "inicio":
        return <DashboardHome />;

      case "registro":
        return <RegistroAlumnos />;

      case "consultas":
        return <ConsultasAlumnos />;

      case "docentes":
        return <DocentesDivision />;

      case "historial":
        return <HistorialCambios />;

      case "usuario":
        return <AgregarUsuario />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-page">

      <Sidebar
        seccionActiva={seccionActiva}
        setSeccionActiva={setSeccionActiva}
      />

      <main className="main-content">

        <Topbar
          usuario={usuario}
          cerrarSesion={cerrarSesion}
          seccionActiva={seccionActiva}
        />

        {renderContenido()}

      </main>
    </div>
  );
}

export default Dashboard;