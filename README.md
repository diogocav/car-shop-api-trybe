# Projeto Car Shop

Projeto realizado durante módulo de Back-end do curso de desenvolvimento web da Trybe.
Neste projeto, apliquei os princípios de Programação Orientada a Objetos (POO) para a construção de uma API com CRUD para gerenciar uma concessionária de veículos. Isso foi feito utilizando o banco de dados MongoDB através do framework do Mongoose.


-----

  **Com Docker:**

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

  **:Rode os serviços app-car-shop e mongodb com o comando:**

- [ ] `docker-compose up -d`

**Lembre-se de parar o mongo se estiver usando localmente na porta padrão (27017), ou adapte, caso queria fazer uso da aplicação em containers**

**Esses serviços irão inicializar um container chamado car_shop e outro chamado car_shop_db.**

**A partir daqui você pode rodar o container car_shop via CLI ou abri-lo no VS Code.**

**Localmente:**

- [ ] `Instale as dependências com: npm install`

**Necessita ter um banco de dados(MongoDb) instalado localmente**

-----
 
Tecnologias usadas no projeto:

- `Typescript`
- `express`
- `Mongoose`
- `MongoDb`
- `docker`
- `POO`
- `sinon`
- `chai`

Operações realizadas:

- Criação de API em typescript utilizando POO;
- Acesso a banco de dados MongoDb através de ODM Mongoose;
- Criação de testes com sinon e chai para a camada service;
- Criação das endpoints de CRUD da API em express;

<!-- :construction: README customizado em construção ! :construction: -->
<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
