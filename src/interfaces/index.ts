interface IComprarOuVender {
  "CodCliente": number;
  "CodAtivo": number;
  "QtdeAtivo": number;
}

interface IGetByClient {
  "CodCliente": number;
  "CodAtivo": number;
  "QtdeAtivo": number;
  "Valor": number;
}

interface IGetByAssets {
  "CodAtivo": number;
  "QtdeAtivo": number;
  "Valor": number;
}

interface IPostDepositoOuSaque {
  "CodCliente": number;
  "Valor": number;
}

interface IGetSaldo {
  "CodCliente": number;
  "Saldo": number;
}

export { IComprarOuVender , IGetByClient, IGetByAssets, IPostDepositoOuSaque, IGetSaldo };