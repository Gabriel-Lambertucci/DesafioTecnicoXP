DROP SCHEMA IF EXISTS DesafioTecnico;
CREATE SCHEMA IF NOT EXISTS DesafioTecnico;

CREATE TABLE DesafioTecnico.Clientes(
  CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  UserName TEXT NOT NULL
);

CREATE TABLE DesafioTecnico.Ativos(
  CodAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  ValorUnitario INTEGER NOT NULL,
  QtdeCorretora INTEGER NOT NULL
);

CREATE TABLE DesafioTecnico.InvestimentosComprar (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  QtdeAtivo INTEGER NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES DesafioTecnico.Clientes (CodCliente),
  FOREIGN KEY (CodAtivo) REFERENCES DesafioTecnico.Ativos (CodAtivo)
);

CREATE TABLE DesafioTecnico.InvestimentosVender (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  QtdeAtivo INTEGER NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES DesafioTecnico.Clientes (CodCliente),
  FOREIGN KEY (CodAtivo) REFERENCES DesafioTecnico.Ativos (CodAtivo)
);

INSERT INTO
  DesafioTecnico.Ativos(ValorUnitario, QtdeCorretora)
VALUES
  (10.00, 100),
  (15.00, 100),
  (20.00, 500),
  (50.00, 600),
  (40.00, 100),
  (80.00, 50),
  (30.00, 40),
  (20.00, 100),
  (30.00, 10),
  (40.00, 20);

#INSERT INTO
#  DesafioTecnico.Clientes (username)
#VALUES
#  ("Ricardo Machado"),
#  ("Gabriel Felix"),
#  ("Rodrigo Castro");

#INSERT INTO
# DesafioTecnico.InvestimentosComprar (CodCliente, CodAtivo, QtdeAtivo)
#VALUES
# (1, 1, 10),
#  (2, 3, 20),
#  (3, 2, 3);

#INSERT INTO
# DesafioTecnico.InvestimentosVender (CodCliente, CodAtivo, QtdeAtivo)
#VALUES
#  (1, 1, 5),
#  (2, 3, 4),
#  (3, 2, 1);
