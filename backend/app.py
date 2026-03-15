from flask import Flask, request, jsonify # Importamos jsonify para enviar respuestas en formato JSON
from flask_cors import CORS # Importamos CORS para permitir solicitudes desde el frontend
import psycopg # Importamos psycopg para conectarnos a la base de datos PostgreSQL
import bcrypt # Importamos bcrypt para manejar el hashing de contraseñas

app = Flask(__name__) # Creamos una instancia de Flask
CORS(app) # Habilitamos CORS para permitir solicitudes desde el frontend (puedes configurar esto según tus necesidades)

def get_connection(): # Función para obtener una conexión a la base de datos PostgreSQL
    return psycopg.connect(
        host="localhost",
        dbname="proceso_titulacion",
        user="postgres",
        password="password",
        port="5432"
    )

@app.route("/") # Ruta de prueba para verificar que el backend está funcionando
def inicio(): #función que maneja la ruta de inicio
    return jsonify({"mensaje": "Backend funcionando"}) # Devolvemos un mensaje en formato JSON para confirmar que el backend está funcionando

@app.route("/registro", methods=["POST"]) # Ruta para registrar un nuevo usuario, solo acepta solicitudes POST
def registro(): # Función que maneja la ruta de registro de usuarios
    try:
        data = request.get_json() # Obtenemos los datos enviados en la solicitud POST en formato JSON

        nombre = data.get("nombre") # Obtenemos el nombre de usuario del JSON
        password = data.get("password") # Obtenemos la contraseña del JSON

        if not nombre or not password: # Verificamos que ambos campos estén presentes, si no lo están, devolvemos un mensaje de error
            return jsonify({"mensaje": "Todos los campos son obligatorios"}), 400 # Devolvemos un mensaje de error en formato JSON con un código de estado 400 (Bad Request)

        conn = get_connection() # Obtenemos una conexión a la base de datos
        cur = conn.cursor()# Creamos un cursor para ejecutar consultas SQL

        cur.execute("SELECT id FROM usuarios WHERE nombre = %s", (nombre,)) # Verificamos si el nombre de usuario ya existe en la base de datos, ejecutando una consulta SQL
        existente = cur.fetchone() # Obtenemos el resultado de la consulta, si existe un usuario con ese nombre, 'existente' no será None

        if existente: # Si el nombre de usuario ya existe, cerramos la conexión y devolvemos un mensaje de error
            cur.close()# Cerramos el cursor
            conn.close()# Cerramos la conexión a la base de datos
            return jsonify({"mensaje": "El nombre de usuario ya existe"}), 400 # Devolvemos un mensaje de error en formato JSON con un código de estado 400 (Bad Request)0

        password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()) # Hasheamos la contraseña utilizando bcrypt, convirtiendo la contraseña a bytes antes de hashearla

        cur.execute( # Insertamos el nuevo usuario en la base de datos, utilizando una consulta SQL parametrizada para evitar inyecciones SQL
            "INSERT INTO usuarios (nombre, password) VALUES (%s, %s)", # Insertamos el nuevo usuario en la base de datos, utilizando una consulta SQL parametrizada para evitar inyecciones SQL
            (nombre, password_hash.decode("utf-8")) # Insertamos el nuevo usuario en la base de datos, utilizando una consulta SQL parametrizada para evitar inyecciones SQL, y decodificamos el hash de la contraseña a UTF-8 para almacenarlo como texto en la base de datos
        )

        conn.commit() # Confirmamos la transacción para guardar los cambios en la base de datos
        cur.close() # Cerramos el cursor
        conn.close()# Cerramos la conexión a la base de datos

        return jsonify({"mensaje": "Usuario registrado correctamente"}), 201

    except Exception as e:# Si ocurre cualquier error durante el proceso, capturamos la excepción y devolvemos un mensaje de error en formato JSON con un código de estado 500 (Internal Server Error)
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"]) # Ruta para iniciar sesión, solo acepta solicitudes POST
def login():
    try:
        data = request.get_json()

        nombre = data.get("nombre")
        password = data.get("password")

        if not nombre or not password: # Verificamos que ambos campos estén presentes, si no lo están, devolvemos un mensaje de error
            return jsonify({"mensaje": "Nombre y contraseña son obligatorios"}), 400

        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT id, nombre, password FROM usuarios WHERE nombre = %s", # Buscamos el usuario en la base de datos por su nombre, utilizando una consulta SQL parametrizada para evitar inyecciones SQL
            (nombre,)
        )
        usuario = cur.fetchone()

        cur.close()
        conn.close()

        if not usuario:
            return jsonify({"mensaje": "Usuario no encontrado"}), 404 # Si no se encuentra el usuario, devolvemos un mensaje de error en formato JSON con un código de estado 404 (Not Found)

        id_usuario, nombre_db, password_hash = usuario # Desempaquetamos los datos del usuario obtenido de la base de datos, obteniendo el ID, el nombre y el hash de la contraseña

        if bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8")):
            return jsonify({
                "mensaje": "Inicio de sesión correcto",
                "usuario": {
                    "id": id_usuario,
                    "nombre": nombre_db
                }
            }), 200
        else:
            return jsonify({"mensaje": "Contraseña incorrecta"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)