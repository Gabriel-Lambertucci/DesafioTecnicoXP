DROP SCHEMA IF EXISTS DesafioTecnico;
CREATE SCHEMA IF NOT EXISTS DesafioTecnico;

CREATE TABLE DesafioTecnico.Clientes(
  CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  UserName TEXT NOT NULL
);

CREATE TABLE DesafioTecnico.InvestimentosComprar (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  QtdeAtivo INTEGER NOT NULL,
  FOREIGN KEY (codCliente) REFERENCES DesafioTecnico.Clientes (codCliente)
);

CREATE TABLE DesafioTecnico.InvestimentosVender (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  QtdeAtivo INTEGER NOT NULL,
  FOREIGN KEY (codCliente) REFERENCES DesafioTecnico.Clientes (codCliente)
);

INSERT INTO
  DesafioTecnico.Clientes (username)
VALUES
  ("Ricardo Machado"),
  ("Gabriel Felix"),
  ("Rodrigo Castro");

INSERT INTO
 DesafioTecnico.InvestimentosComprar (CodCliente, CodAtivo, QtdeAtivo)
VALUES
  (1, 101, 10),
  (2, 85, 20),
  (3, 99, 3);

INSERT INTO
 DesafioTecnico.InvestimentosVender (CodCliente, CodAtivo, QtdeAtivo)
VALUES
  (1, 101, 5),
  (2, 85, 4),
  (3, 99, 1);