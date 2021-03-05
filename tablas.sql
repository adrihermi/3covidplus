-- Creamos y establecemos la base de datos
DROP DATABASE IF EXISTS 3_covid_plus;
CREATE DATABASE 3_covid_plus;
USE 3_covid_plus;

-- Si no existe creamos la tabla alumnos
create TABLE IF NOT EXISTS alumnos(
    nombre VARCHAR (25) NOT NULL,
    apellido1 VARCHAR (100) NOT NULL,
    apellido2 VARCHAR (100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino','Femenino','Otros') NOT NULL, 
    telefono VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    email_tutor_legal VARCHAR(50) NOT NULL,
    observaciones VARCHAR(150),
    id_aula INT NOT NULL,
    dni_alumno VARCHAR (9) NOT NULL PRIMARY KEY,
    CONSTRAINT fk_alumnos_aulas FOREIGN KEY  (id_aula) REFERENCES aulas (id_aula)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = "MyISAM" DEFAULT CHARSET = "latin1";

-- Si no existe creamos la tabla aulas 
create TABLE IF NOT EXISTS aulas(
    nombre VARCHAR (50) NOT NULL,
    capacidad int (2) NOT NULL,
    dni_profesor VARCHAR(9) NOT NULL UNIQUE,
    id_aula INT NOT NULL PRIMARY KEY,   
    CONSTRAINT fk_aulas_profesor FOREIGN KEY (dni_profesor) REFERENCES profesores (dni_profesor)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla fechas
create TABLE IF NOT EXISTS estados_alumnos(
    fecha DATE NOT NULL,
    dni_alumno VARCHAR(9) NOT NULL,
    id_estado INT NOT NULL,
    CONSTRAINT pk_estado_alumnos PRIMARY KEY(fecha,dni_alumno,id_estado),
    CONSTRAINT fk_fechas_alumnos FOREIGN KEY (dni_alumno) REFERENCES alumnos (dni_alumno)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT,
    CONSTRAINT fk_fechas_estados FOREIGN KEY (id_estado) REFERENCES estados (id_estados)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla estados
create TABLE IF NOT EXISTS estados(
    descripcion VARCHAR(15) NOT NULL,
    id_estado INT AUTO_INCREMENT NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla horarios 
    create TABLE IF NOT EXISTS horarios(
    dia VARCHAR(15) NOT NULL,
    hora_inicio VARCHAR(25) NOT NULL,
    hora_final VARCHAR(25) NOT NULL,
    id_aula INT NOT NULL,
    dni_profesor VARCHAR(9) NOT NULL,
    CONSTRAINT pk_horarios PRIMARY KEY(dia,hora_inicio,id_aula,dni_profesor),
    CONSTRAINT fk_horarios_aulas FOREIGN KEY (id_aula) REFERENCES aulas (id_aula)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT,
    CONSTRAINT fk_horario_profesores FOREIGN KEY (dni_profesor) REFERENCES profesores (dni_profesor)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla profesores
create TABLE IF NOT EXISTS profesores(
    nombre VARCHAR (25) NOT NULL,
    apellido1 VARCHAR (100) NOT NULL,
    apellido2 VARCHAR (100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino','Femenino','Otros') NOT NULL,
    telefono VARCHAR(11) NOT NULL,
    email_profesor VARCHAR(50) NOT NULL,
    observaciones VARCHAR(150),
    dni_profesor VARCHAR(9) NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla notificaciones_profesores
create TABLE IF NOT EXISTS notificaciones_profesores(
    fecha DATE NOT NULL,
    dni_profesor VARCHAR(9) NOT NULL,
    id_n_p INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    CONSTRAINT fk_notificaciones_profesores_profesores FOREIGN KEY (dni_profesor) REFERENCES profesores (dni_profesor)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla notificaciones_alumnos
create TABLE IF NOT EXISTS notificaciones_alumnos(
    fecha DATE NOT NULL,
    dni_alumno VARCHAR(9) NOT NULL,
    id_n_a INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    CONSTRAINT fk_notificaciones_alumnos_alumnos FOREIGN KEY (dni_alumno) REFERENCES alumnos (dni_alumno)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla usuarios
create TABLE IF NOT EXISTS usuarios(
    contraseña VARCHAR (50) NOT NULL,
    nombre VARCHAR (25) NOT NULL,
    apellido1 VARCHAR (100) NOT NULL,
    apellido2 VARCHAR (100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino','Femenino','Otros') NOT NULL,
    telefono VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    permisos ENUM('Administrador','Usuario') NOT NULL,
    dni_usuario VARCHAR(9) NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;