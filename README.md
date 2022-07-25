# Boas vindas ao repositório da minha Api feita para o DesafioTecnicoXP!

<details>
  <summary><strong>Como foi desenvolvido</strong></summary><br />
  
  <p> A linguagem utilizada no projeto foi TypeScript.  </p>
  <p> Resolvi utilizá-la porque sua tipagem confere mais organização e confiança em um código, principalmente de back-end. Além de ter características mais próximas ao c#, como POO, do que o JavaScript.  </p>
  <p> Para tornar mais real as simulações feitas através da aplicação, estou utilizando um banco myql remoto, para guardar e buscar informações de forma dinâmica. </p>
  <p> Api produzida com camadas de controller, service, model e middlewares.</p>
</details>

<details>
  <summary><strong>Deploy na Heroku!</strong></summary><br />
  
  <p> O deploy da aplicação foi feito na plataforma Heroku, onde tive experiência e subir aplicações na Trybe.</p>
  <p> Dessa forma a Api está pronta para receber requisições através do link https://api-desafioxp.herokuapp.com/ seguido de todos endpoints que o projeto possui.</p:>
  <p> Está configurado o endpoint https://api-desafioxp.herokuapp.com/docs para a documentação da Api feita através do Swagger.</p>
</details> 

<details>
  <summary><strong>Rodando no Docker ou Localmente</strong></summary><br/>
  
  ## Com Docker

   <p> Rode o serviço `DesafioTecnicoXP` com o comando `docker-compose up -d`.</p>
   <p> Esse serviço irá inicializar um container chamado `DesafioTecnicoXP`.</p>
   <p> A partir daqui você pode rodar o container `DesafioTecnicoXP` via CLI ou abri-lo no VS Code.</p>

   <p> Use o comando `docker exec -it DesafioTecnicoXP bash`.</p>
   <p> Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.</p>

  <p> Instale as dependências com `npm install`</p>
    <p> Passos para executar:</p>
    <p> Primeiramente rode o comando `npm run db`, isso fará com que o banco mysql utilizado para tornar o projeto mais completo, receba as configurações iniciais, como tabelas, colunas e etc.</p>
    <p> Agora já podemos colocar a API no ar. Rode o comando `npm run start:test`.</p>
    <p> O serviço está configurado para rodar na porta 3001 de sua máquina local. A partir de agora já podemos enviar requisições para esta porta!</p>
  
   ## Sem Docker
  
  <p> Instale as dependências com `npm install`</p>
   <p> Passos para executar:</p>
     <p> Primeiramente rode o comando `npm run db`, isso fará com que o banco mysql utilizado para tornar o projeto mais completo, receba as configurações iniciais, como tabelas, colunas e etc.</p>
     <p> Agora já podemos colocar a API no ar. Rode o comando `npm run start:test`.</p>
     <p> O serviço está configurado para rodar na porta 3000 de sua máquina local. A partir de agora já podemos enviar requisições para esta porta!</p>
   <br/>
</details>

<details>
   <summary><strong> Rodando Testes </strong></summary><br />

  <p> Para inicar os testes da aplicação é muito simples. Rode o comando npm test em seu terminal e a mágica acontece.</p>
   <p> São 4 testes que testam de forma bem completa a aplicação, mas claro que quanto mais melhor e isso está no meu planejamento para o futuro!</p>
   <br/>
</details>

<details>
   <summary><strong> EndPoints </strong></summary><br />

  <p> A Api está documentada através do SwaggerUI. </p>
  <p> Peço então que acessem o documento, através do endpoint https://api-desafioxp.herokuapp.com/docs, ou se estiver rodando localmente a aplicação através de http://localhost:3000/docs (Local) ou http://localhost:3001/docs (Docker), para que vejam todas as possibilidades que a Api oferece!</p>
   <br/>
</details>
