--Creamos y establecemos la base de datos
drop database if exists 3_covid_plus;
create database 3_covid_plus
use 3_covid_plus;

--Si no existe creamos la tabla alumnos
create TABLE IF NOT EXISTS alumnos(
    nombre VARCHAR (25) NOT NULL,
    apellido1 VARCHAR (25) NOT NULL,
    apellido2 VARCHAR (25) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino','Femenino','Otros') NOT NULL, 
    telefono VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    id_aula INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_alumnos_aulas (id_aula) REFERENCES aulas (id_aula),
    dni_alumno VARCHAR (9) NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla aulas.
create TABLE IF NOT EXISTS aulas(
    nombre VARCHAR (50) NOT NULL,
    capacidad int (2) NOT NULL,   
    id_aula INT NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla fechas
create TABLE IF NOT EXISTS fechas(
    fecha DATE NOT NULL,
    dni_alumno VARCHAR(9) NOT NULL,
    id_estado INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_fechas_alumnos (dni_alumno) REFERENCES alumnos (dni_alumno),
    CONSTRAINT FOREIGN KEY fk_fechas_estados (id_estado) REFERENCES estados (id_estados),
    PRIMARY KEY(fecha,dni_alumno,id_estado)
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla estados
create TABLE IF NOT EXISTS estados(
    descripcion VARCHAR(15) NOT NULL,
    id_estado INT AUTO_INCREMENT NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla horarios 
    create TABLE IF NOT EXISTS horarios(
    dia VARCHAR(15) NOT NULL,
    hora_inicio VARCHAR(25) NOT NULL,
    hora_final VARCHAR(25) NOT NULL,
    id_aula INT NOT NULL,
    dni_profesor VARCHAR(9) NOT NULL,
    CONSTRAINT FOREIGN KEY fk_horarios_aulas (id_aula) REFERENCES aulas (id_aula),
    CONSTRAINT FOREIGN KEY fk_horario_profesores (dni_profesor) REFERENCES profesores (dni_profesor),
    PRIMARY KEY(id_aula,dni_profesor)
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla profesores
create TABLE IF NOT EXISTS profesores(
    nombre VARCHAR (25) NOT NULL,
    apellido1 VARCHAR (25) NOT NULL,
    apellido2 VARCHAR (25) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino','Femenino','Otros') NOT NULL,
    telefono VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    dni_profesor VARCHAR(9) NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla notificaciones_profesores
create TABLE IF NOT EXISTS notificaciones_profesores(
    fecha DATE NOT NULL,
    dni_profesor VARCHAR(9) NOT NULL,
    CONSTRAINT FOREIGN KEY fk_notificaciones_profesores_profesores (dni_profesor) REFERENCES profesores (dni_profesor),
    id_n_p INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla notificaciones_alumnos
create TABLE IF NOT EXISTS notificaciones_alumnos(
    fecha DATE NOT NULL,
    dni_alumno VARCHAR(9) NOT NULL,
    CONSTRAINT FOREIGN KEY fk_notificaciones_alumnos_alumnos (dni_alumno) REFERENCES alumnos (dni_alumno),
    id_n_a AUTO_INCREMENT NOT NULL PRIMARY KEY,
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

--Si no existe creamos la tabla usuarios
create TABLE IF NOT EXISTS usuarios(
    nombre VARCHAR (25) NOT NULL,
    apellido1 VARCHAR (25) NOT NULL,
    apellido2 VARCHAR (25) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino','Femenino','Otros') NOT NULL,
    telefono VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    permisos ENUM('Administrador','Usuario') NOT NULL,
    estado bit TINYINT (1) not null,
    dni_usuario VARCHAR(9) NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;