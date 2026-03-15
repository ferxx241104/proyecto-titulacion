function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido {usuario?.nombre}</p>
    </div>
  );
}

export default Dashboard;