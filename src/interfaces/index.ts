interface IComprar {
  "CodCliente": number;
  "CodAtivo": number;
  "QtdeAtivo": number;
}

interface IVender {
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

export { IComprar, IVender, IGetByClient, IGetByAssets, IPostDepositoOuSaque, IGetSaldo };