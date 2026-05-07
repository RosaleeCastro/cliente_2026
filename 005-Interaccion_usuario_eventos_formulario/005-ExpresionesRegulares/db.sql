CREATE DATABASE IF NOT EXISTS ejercicio_validacion
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE ejercicio_validacion;

CREATE TABLE IF NOT EXISTS registros_validacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(30) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    dni CHAR(9) NOT NULL,
    nie CHAR(9) NOT NULL,
    matricula CHAR(7) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB;