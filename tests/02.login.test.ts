const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const shell = require('shelljs');
require('dotenv').config();

describe('Testando rotas cliente', () => {
  beforeAll(() => {
    shell.exec('npm run db');
  });

  describe('Testando login de um cliente', () => {
    it('Cliente devidamente cadastrado.', async () => {
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
        ).expect('status', 200)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          const token = result.token;
          expect(token).not.toBeNull();
          expect(token).not.toBeUndefined();
          expect(typeof token).toBe('string');
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            expect(decoded).not.toBe(expect.objectContaining(
              { password: expect.any(String) }
            ));
          } catch (error) {
            console.log(error);
            throw Error('Seu `token` não consegue ser verificado a partir do segredo da variável de ambiente `JWT_SECRET`')
          }
        })
    });

    it('Cliente não cadastrado.', async () => {
      await frisby
        .post(
          'http://localhost:3000/login',
          {
            Nome: 'Rodrigo Teixeira',
            Senha: 'senharodrigo',
          },
        ).expect('status', 500)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toStrictEqual("Usuário e/ou senha incorretos");
        });
    });
  });
});
