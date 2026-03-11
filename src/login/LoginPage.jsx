//login 
import "./css/LoginPage.css"; // Importa el archivo CSS para estilos del login
function LoginPage() {
    return (
        <div className="page"> {/* Contenedor principal del login */}
            <div className="card"> {/* Tarjeta del login */}
            {/* Panel izquierdo */}
            <div className="left-panel">
                <div className="overlay"> {/* Overlay para el panel izquierdo */}
                    <h1>Bienvenido al Proceso de titulación</h1> {/* Título del login */}
                    <p>Inicia sesión para continuar</p> {/* Descripción del login */}
                </div>
            </div>

            {/* Panel derecho */}
            <div className="right-panel">
                <form className="login-form"> {/* Formulario de login */}
                    <h2>Iniciar Sesión</h2> {/* Título del formulario */}

                    <input type="text" placeholder="Usuario"/> {/* Campo de usuario */}
                    <input type="password" placeholder="Contraseña"/> {/* Campo de contraseña */}

                    <button type="submit">Ingresar</button> {/* Botón de ingreso */}
                    <p>¿Olvidaste tu contraseña? Ponte en contacto para restablecer la contraseña</p>
                </form>
            </div>
            </div>
        </div>
    );
}

export default LoginPage;
