const frisby = require('frisby');
const shell = require('shelljs');

describe('Testando rotas ativos', () => {
  jest.setTimeout(10000)
  beforeAll(() => {
    shell.exec('npm run db');
  });

    describe('Testando Retorno da lista de ativos', () => {
    let token = '';

    it('Front-end solicita a lista de ativos', async () => {
      await frisby
      .get(
        'http://localhost:3000/ativos',
      ).expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual(
          [
            {
                CodAtivo: 1,
                Ativo: "Amazon",
                ValorUnitario: 10.5,
                QtdeCorretora: 100
            },
            {
                CodAtivo: 2,
                Ativo: "Americanas",
                ValorUnitario: 15.75,
                QtdeCorretora: 100
            },
            {
                CodAtivo: 3,
                Ativo: "Banco do Brasil",
                ValorUnitario: 20.200000762939453,
                QtdeCorretora: 500
            },
            {
                CodAtivo: 4,
                Ativo: "Banco Pan",
                ValorUnitario: 50,
                QtdeCorretora: 600
            },
            {
                CodAtivo: 5,
                "Ativo": "Bradesco",
                ValorUnitario: 40.099998474121094,
                QtdeCorretora: 100
            },
            {
                CodAtivo: 6,
                Ativo: "Carrefour",
                ValorUnitario: 80.5,
                QtdeCorretora: 50
            },
            {
                CodAtivo: 7,
                Ativo: "Gol",
                ValorUnitario: 30.200000762939453,
                QtdeCorretora: 40
            },
            {
                CodAtivo: 8,
                Ativo: "Petrobras",
                ValorUnitario: 20.299999237060547,
                QtdeCorretora: 100
            },
            {
                CodAtivo: 9,
                Ativo: "Santander",
                ValorUnitario: 31.399999618530273,
                QtdeCorretora: 10
            },
            {
                CodAtivo: 10,
                Ativo: "XP",
                ValorUnitario: 409.1499938964844,
                QtdeCorretora: 20
            }
        ]
        )
      })
    })

    it('Após uma compra, quantidade de uma ação disponivel na corretora é atualizada', async () => {

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
          CodAtivo:5,
          QtdeAtivo: 50
      },
      ).expect('status', 200)
      
      await frisby
      .get(
        'http://localhost:3000/ativos',
      ).expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toStrictEqual(
          [
            {
                CodAtivo: 1,
                Ativo: "Amazon",
                ValorUnitario: 10.5,
                QtdeCorretora: 100
            },
            {
                CodAtivo: 2,
                Ativo: "Americanas",
                ValorUnitario: 15.75,
                QtdeCorretora: 100
            },
            {
                CodAtivo: 3,
                Ativo: "Banco do Brasil",
                ValorUnitario: 20.200000762939453,
                QtdeCorretora: 500
            },
            {
                CodAtivo: 4,
                Ativo: "Banco Pan",
                ValorUnitario: 50,
                QtdeCorretora: 600
            },
            {
                CodAtivo: 5,
                "Ativo": "Bradesco",
                ValorUnitario: 40.099998474121094,
                QtdeCorretora: 50
            },
            {
                CodAtivo: 6,
                Ativo: "Carrefour",
                ValorUnitario: 80.5,
                QtdeCorretora: 50
            },
            {
                CodAtivo: 7,
                Ativo: "Gol",
                ValorUnitario: 30.200000762939453,
                QtdeCorretora: 40
            },
            {
                CodAtivo: 8,
                Ativo: "Petrobras",
                ValorUnitario: 20.299999237060547,
                QtdeCorretora: 100
            },
            {
                CodAtivo: 9,
                Ativo: "Santander",
                ValorUnitario: 31.399999618530273,
                QtdeCorretora: 10
            },
            {
                CodAtivo: 10,
                Ativo: "XP",
                ValorUnitario: 409.1499938964844,
                QtdeCorretora: 20
            }
        ]
        )
      })
    })
  });
})