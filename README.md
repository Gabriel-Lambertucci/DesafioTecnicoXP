# Boas vindas ao repositório da minha Api feita para o DesafioTecnicoXP!

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker

  > Rode o serviço `DesafioTecnicoXP` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `DesafioTecnicoXP`.
  - A partir daqui você pode rodar o container `DesafioTecnicoXP` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it trybers_and_dragons bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências com `npm install`
  > Passos para executar:
    > Primeiramente rode o comando `npm run db`, isso fará com que o banco mysql utilizado para tornar o projeto mais completo, receba as configurações iniciais, como tabelas, colunas e etc.
    > Agora já podemos colocar a API no ar. Rode o comando `npm run start:test`.
    > O serviço está configurado para rodar na porta 3001 de sua máquina local. A partir de agora já podemos enviar requisições para esta porta!
  
   ## Sem Docker
  
  > Instale as dependências com `npm install`
   > Passos para executar:
    - Primeiramente rode o comando `npm run db`, isso fará com que o banco mysql utilizado para tornar o projeto mais completo, receba as configurações iniciais, como tabelas, colunas e etc.
    - Agora já podemos colocar a API no ar. Rode o comando `npm run start:test`.
    - O serviço está configurado para rodar na porta 3000 de sua máquina local. A partir de agora já podemos enviar requisições para esta porta!
   <br/>
</details>

<details>
   <summary><strong> Rodando Testes </strong></summary><br />

  > Para inicar os testes da aplicação é muito simples. Rode o comando npm test em seu terminal e a mágica acontece.
  - São 4 testes que testam de forma bem completa a aplicação, mas claro que quanto mais melhor e isso está no meu planejamento para o futuro!
   <br/>
</details>

<details>
   <summary><strong> EndPoints </strong></summary><br />

  > A Api está documentada através do SwaggerUI. Peço então que acessem o documento, através do endpoint http://localhost:3000/docs (Local) ou http://localhost:3001/docs (Docker), para que vejam todas as possibilidades que a Api oferece!
   <br/>
</details>
