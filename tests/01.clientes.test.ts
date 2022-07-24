const frisby = require('frisby');
const shell = require('shelljs');

describe('Testando rotas cliente', () => {
  jest.setTimeout(10000)
  beforeAll(() => {
    shell.exec('npm run db');
  });

  describe('Testando cadastro de um novo cliente', () => {
    it('Cliente não existe. Cadastro realizado.', async () => {
      await frisby
        .post(
          'http://localhost:3000/cliente',
          {
            Nome: 'Gabriel Lambertucci',
            Senha: '123456',
          },
        ).expect('status', 201)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result).toStrictEqual({
            CodCliente: 1,
            Nome: 'Gabriel Lambertucci',
          });
        });
    });

    it('Cliente já está cadastrado.', async () => {
      await frisby
        .post(
          'http://localhost:3000/cliente',
          {
            Nome: 'Gabriel Lambertucci',
            Senha: '123456',
          },
        ).expect('status', 404)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toStrictEqual("Usuário já Cadastrado");
        });
    });
  });

    describe('Testando retorno da lista com clientes cadastrados', () => {
      it('lista de clientes é retornada com sucesso', async () => {
        await frisby
          .get(
            'http://localhost:3000/clientes'
          ).expect('status', 200)
          .then((response) => {
            const { body } = response;
            const result = JSON.parse(body);
            expect(result).toStrictEqual([{
              CodCliente: 1,
              Nome: "Gabriel Lambertucci"
            }]);
          });
      });
    })
});
