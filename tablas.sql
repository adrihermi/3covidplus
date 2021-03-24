-- Creamos y establecemos la base de datos
DROP DATABASE IF EXISTS covid_plus;
CREATE DATABASE covid_plus;
USE covid_plus;

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
    dni_alumno VARCHAR (9) NOT NULL UNIQUE,
    id_alumno INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    CONSTRAINT fk_alumnos_aulas FOREIGN KEY  (id_aula) REFERENCES aulas (id_aula)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = "MyISAM" DEFAULT CHARSET = "latin1";

-- Si no existe creamos la tabla aulas 
create TABLE IF NOT EXISTS aulas(
    nombre VARCHAR (50) NOT NULL,
    capacidad ENUM('16','20','24','28','32') NOT NULL,
    id_aula INT AUTO_INCREMENT NOT NULL PRIMARY KEY  
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla fechas
create TABLE IF NOT EXISTS estados_alumnos(
    fecha DATETIME NOT NULL,
    id_alumno VARCHAR(9) NOT NULL,
    id_estado INT NOT NULL,
    id_estado_alumno INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    CONSTRAINT fk_fechas_alumnos FOREIGN KEY (id_alumno) REFERENCES alumnos (id_alumno)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT,
    CONSTRAINT fk_fechas_estados FOREIGN KEY (id_estado) REFERENCES estados (id_estados)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla estados
create TABLE IF NOT EXISTS estados(
    descripcion VARCHAR(30) NOT NULL,
    id_estado INT AUTO_INCREMENT NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Inserimos los estados
INSERT INTO estados (descripcion, id_estado) VALUES ('Normal', 1);
INSERT INTO estados (descripcion, id_estado) VALUES ('Espera resultados PCR', 2);
INSERT INTO estados (descripcion, id_estado) VALUES ('Positivo', 3);
INSERT INTO estados (descripcion, id_estado) VALUES ('En contacto con un positivo', 4);

-- Si no existe creamos la tabla horarios 
    create TABLE IF NOT EXISTS horarios(
    dia VARCHAR(15) NOT NULL,
    hora_inicio VARCHAR(25) NOT NULL,
    hora_final VARCHAR(25) NOT NULL,
    id_aula INT NOT NULL,
    id_profesor VARCHAR(9) NOT NULL,
    CONSTRAINT pk_horarios PRIMARY KEY(dia,hora_inicio,hora_final,id_aula,id_profesor),
    CONSTRAINT fk_horarios_aulas FOREIGN KEY (id_aula) REFERENCES aulas (id_aula)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT,
    CONSTRAINT fk_horario_profesores FOREIGN KEY (id_profesor) REFERENCES profesores (id_profesor)
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
    dni_profesor VARCHAR(9) NOT NULL UNIQUE,
    id_aula INT NOT NULL,
    CONSTRAINT fk_alumnos_aulas FOREIGN KEY  (id_aula) REFERENCES aulas (id_aula)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT,
    id_profesor INT AUTO_INCREMENT NOT NULL PRIMARY KEY 
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla notificaciones_profesores
create TABLE IF NOT EXISTS notificaciones_profesores(
    fecha DATE NOT NULL,
    id_profesor VARCHAR(9) NOT NULL,
    id_n_p INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    CONSTRAINT fk_notificaciones_profesores_profesores FOREIGN KEY (id_profesor) REFERENCES profesores (id_profesor)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla notificaciones_alumnos
create TABLE IF NOT EXISTS notificaciones_alumnos(
    fecha DATE NOT NULL,
    id_alumno VARCHAR(9) NOT NULL,
    id_n_a INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    CONSTRAINT fk_notificaciones_alumnos_alumnos FOREIGN KEY (id_alumno) REFERENCES alumnos (id_alumno)
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
    dni_usuario VARCHAR(9) NOT NULL UNIQUE,
    id_usuario INT AUTO_INCREMENT NOT NULL PRIMARY KEY
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

-- Si no existe creamos la tabla posicion_alumnos
create TABLE IF NOT EXISTS posicion_alumnos(
    id_aula INT NOT NULL, 
    id_alumno VARCHAR(9) NOT NULL,
    posicion_x INT NOT NULL,
    posicion_y INT NOT NULL,
    id_posicion INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    CONSTRAINT fk_posicion_alumnos_alumnos FOREIGN KEY (id_alumno) REFERENCES alumnos (id_alumno)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT,
    CONSTRAINT fk_posicion_alumnos_aulas FOREIGN KEY  (id_aula) REFERENCES aulas (id_aula)
    ON UPDATE CASCADE 
    ON DELETE RESTRICT
)ENGINE = MyISAM DEFAULT CHARSET = latin1;

INSERT INTO estados_alumnos (fecha, id_alumno, id_estado)
 SELECT NOW(), al.id_alumno, '1'
 FROM estados_alumnos AS es
 RIGHT JOIN alumnos AS al ON es.id_alumno=al.id_alumno
 WHERE es.id_estado IS NULL;