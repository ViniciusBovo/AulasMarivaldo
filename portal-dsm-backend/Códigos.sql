CREATE DATABASE portal_dsm
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;



CREATE TABLE usuarios (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 telefone VARCHAR(20),
 criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO usuarios (nome, email, telefone)
VALUES
("Maria", "maria@email.com", "(16) 99999-1111"),
("João", "joao@email.com", "(16) 99999-2222");


CREATE TABLE cursos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL UNIQUE,
 descricao VARCHAR(255),
 criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cursos (nome, descricao)
VALUES
("Redes de Computadores", "Protocolos, infraestrutura e comunicação entre sistemas."),
("Inteligência Artificial", "Aprendizado de máquina e aplicações de IA."),
("Design de Interfaces", "Usabilidade, prototipação e experiência do usuário.");