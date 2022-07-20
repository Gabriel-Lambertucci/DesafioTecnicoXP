import { IComprarOuVender,
  IGetByAssets, IGetByClient, IGetSaldo, IPostDepositoOuSaque } from "../interfaces";

/* const postInvestimentosComprar: IComprarOuVender = {
  "CodAtivo": 85,
  "CodCliente": 1,
  "QtdeAtivo": 20,
}

const postInvestimentosVender: IComprarOuVender = {
  "CodAtivo": 70,
  "CodCliente": 1,
  "QtdeAtivo": 5,
} */

const getByClient1: IGetByClient = {
  "CodCliente": 5,
  "CodAtivo": 55,
  "QtdeAtivo": 10,
  "Valor": 130.55,
}

const getByClient2: IGetByClient = {
  "CodCliente": 5,
  "CodAtivo": 130,
  "QtdeAtivo": 5,
  "Valor": 90.00,
}

const getByAsset: IGetByAssets = {
  "CodAtivo": 15,
  "QtdeAtivo": 1000,
  "Valor": 10.00,
}

/* const postDeposito: IPostDepositoOuSaque = {
  "CodCliente": 3,
  "Valor": 1000.00,
}

const postSaque: IPostDepositoOuSaque = {
  "CodCliente": 3,
  "Valor": 1000.00,
} */

const getSaldo: IGetSaldo = {
  "CodCliente": 2,
  "Saldo": 550.35,
}


export default { postInvestimentosComprar,
  postInvestimentosVender,
  getByClient1, getByClient2, getByAsset, postDeposito, postSaque, getSaldo };