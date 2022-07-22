DROP SCHEMA IF EXISTS hE8vWmxhKd;
CREATE SCHEMA IF NOT EXISTS hE8vWmxhKd;

CREATE TABLE hE8vWmxhKd.Clientes(
  CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  UserName TEXT NOT NULL,
  Senha TEXT NOT NULL
);

CREATE TABLE hE8vWmxhKd.Ativos(
  CodAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  Ativo TEXT NOT NULL,
  ValorUnitario FLOAT NOT NULL,
  QtdeCorretora FLOAT NOT NULL
);

CREATE TABLE hE8vWmxhKd.Investimentos(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  CodAtivo INTEGER NOT NULL,
  QtdeAtivo FLOAT NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES Clientes (CodCliente),
  FOREIGN KEY (CodAtivo) REFERENCES Ativos (CodAtivo)
);

CREATE TABLE hE8vWmxhKd.Conta(
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER NOT NULL,
  Saldo FLOAT NOT NULL,
  FOREIGN KEY (CodCliente) REFERENCES Clientes (CodCliente)
);

INSERT INTO
  hE8vWmxhKd.Ativos(Ativo, ValorUnitario, QtdeCorretora)
VALUES
  ('Amazon',10.50, 100),
  ('Americanas',15.75, 100),
  ('Banco do Brasil',20.20, 500),
  ('Banco Pan',50.0, 600),
  ('Bradesco', 40.10, 100),
  ('Carrefour', 80.50, 50),
  ('Gol', 30.20, 40),
  ('Petrobras', 20.30, 100),
  ('Santander', 31.40, 10),
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
