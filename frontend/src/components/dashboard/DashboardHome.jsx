import React from "react";

function DashboardHome() {
  return (
    <section className="dashboard-summary">
      <h2 className="summary-title">Resumen del proceso de titulación</h2>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Alumnos en proceso</h3>
          <p className="card-number">12</p>
          <span className="card-text">Expedientes activos actualmente</span>
        </div>

        <div className="summary-card">
          <h3>Alumnos titulados</h3>
          <p className="card-number">28</p>
          <span className="card-text">Estudiantes que ya concluyeron</span>
        </div>

        <div className="summary-card">
          <h3>Procesos detenidos</h3>
          <p className="card-number">4</p>
          <span className="card-text">Casos pendientes o sin avance</span>
        </div>
      </div>
    </section>
  );
}

export default DashboardHome;