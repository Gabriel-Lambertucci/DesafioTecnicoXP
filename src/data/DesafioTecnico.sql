DROP SCHEMA IF EXISTS DesafioTecnico;
CREATE SCHEMA IF NOT EXISTS DesafioTecnico;

CREATE TABLE DesafioTecnico.Clientes(
  CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  UserName TEXT NOT NULL,
  Senha TEXT NOT NULL
);

CREATE TABLE DesafioTecnico.Ativos(
  CodAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  Ativo TEXT NOT NULL,
  ValorUnitario FLOAT NOT NULL,
  QtdeCorretora FLOAT NOT NULL
);

CREATE TABLE DesafioTecnico.Investimentos(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  QtdeAtivo FLOAT NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES DesafioTecnico.Clientes (CodCliente),
  FOREIGN KEY (CodAtivo) REFERENCES DesafioTecnico.Ativos (CodAtivo)
);

CREATE TABLE DesafioTecnico.Conta(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  Saldo FLOAT NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES DesafioTecnico.Clientes (CodCliente)
);

INSERT INTO
  DesafioTecnico.Ativos(Ativo, ValorUnitario, QtdeCorretora)
VALUES
  ('Amazon',10.50, 100),
  ('Americanas',15.75, 100),
  ('Banco do Brasil',20.23, 500),
  ('Banco Pan',50.06, 600),
  ('Bradesco', 40.09, 100),
  ('Carrefour', 80.50, 50),
  ('Gol', 30.19, 40),
  ('Petrobras', 20.05, 100),
  ('Santander', 31.73, 10),
  ('XP', 409.15, 20);

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
