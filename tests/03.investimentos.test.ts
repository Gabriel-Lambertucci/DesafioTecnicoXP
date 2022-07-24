const frisby = require('frisby');
const shell = require('shelljs');

describe('Testando rotas investimentos', () => {
  jest.setTimeout(10000)
  beforeAll(() => {
    shell.exec('npm run db');
  });

    describe('Testando Compra e Venda de ativos', () => {
    let token = '';

    it('Cliente tenta realizar uma transação sem token', async () => {
      await frisby
      .post(
        'http://localhost:3000/investimentos/comprar',
        {
          CodCliente: 1,
          CodAtivo: 1,
          QtdeAtivo: 10
      },
      ).expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual({
          message: "token Inválido "
        })
      })
    })

    it('Cliente já está cadastrado e logado na plataforma e faz uma compra sem ter saldo', async () => {

      await frisby
      .post(
        'http://localhost:3000/cliente',
        {
          Nome: 'Gabriel Lambertucci',
          Senha: '123456',
        },
      )
      await frisby
      .post(
        'http://localhost:3000/login',
        {
          Nome: 'Gabriel Lambertucci',
          Senha: '123456',
        },
      ).then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      })

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(
        'http://localhost:3000/investimentos/comprar',
        {
          CodCliente: 1,
          CodAtivo:1,
          QtdeAtivo: 10
      },
      ).expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual({
          message: "Saldo insuficiente para compra",
        });
      });
    });

    it('Cliente já está cadastrado e logado na plataforma e faz uma venda', async () => {
      await frisby
      .post(
        'http://localhost:3000/conta/deposito',
        {
          "CodCliente": 1,
          "Senha":  "123456",
          "Valor": 50000
        },
      )
      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(
        'http://localhost:3000/investimentos/comprar',
        {
          CodCliente: 1,
          CodAtivo:1,
          QtdeAtivo: 10
      },
      )

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(
        'http://localhost:3000/investimentos/vender',
        {
          CodCliente: 1,
          CodAtivo:1,
          QtdeAtivo: 5
      },
      ).expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual({
          message: "Venda realizada com sucesso!",
          Venda: {
              CodCliente: 1,
              CodAtivo: 1,
              QtdeAtivo: 5
          }
        });
      });
    });

    it('Cliente tenta comprar quantidade de uma ação acima do que a corretora possui', async () => {
      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(
        'http://localhost:3000/investimentos/comprar',
        {
          CodCliente: 1,
          CodAtivo:1,
          QtdeAtivo: 101
      },
      ).expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual({
          message: "CodAtivo incorreto ou Quantidade do Ativo indisponível na corretora",
        });
      });
    });

    it('Cliente tenta vender quantidade de uma ação acima do que possui na carteira', async () => {
      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(
        'http://localhost:3000/investimentos/vender',
        {
          CodCliente: 1,
          CodAtivo:1,
          QtdeAtivo: 200
      },
      ).expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual({
          message: "Quantidade a ser vendida indisponível na carteira",
        });
      });
    });

  })
})
