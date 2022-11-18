# Mars Rover Challenge - Teste Emana Group 


![exemplo imagem](https://media-exp1.licdn.com/dms/image/D4D0BAQHB4UiiPJpO2A/company-logo_100_100/0/1664893430143?e=1677110400&v=beta&t=8ULE0gmaHsgRkmCCzN_ZhSCmuLh7Ot_-mcCcMPFDHBo)

> ## **Desenvolvido em: NodeJS, TypeScript, ExpressJS, PostgresSQL, TypeORM e Docker.**
>

## ✅ Funcionalidades
- Criar uma pessoa.
- Autenticar uma pessoa.
- Adicionar e listar cartões de uma conta.
- Adicionar e listar contas da pessoa.
- Realizar e listar transações em uma conta.
- Consultar o saldo de uma conta.
- Realizar transferência interna entre contas.
- Reverter uma transação.

## ✅ Endpoints
* POST /people
* POST /login
* POST /accounts
* GET /accounts
* POST /accounts/:accountId/cards
* GET /accounts/:accountId/cards
* GET /cards
* POST /accounts/:accountId/transactions
* POST /accounts/:accountId/transactions/internal
* GET /accounts/:accountId/transactions
* GET /accounts/:accountId/balance
* POST /accounts/:accountId/transactions/:transactionId/revert

## ✅ Extras
* Documentação Swagger adicionada para realização de testes e validação. Por padrão o projeto estará disponível na porta 3001 em http://localhost:3001/docs

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Ter o Docker instalado e rodando para que seja criada a base de dados dessa aplicação. (Procurar fechar todos os serviços e containeres que já estiverem rodando para evitar conflito de portas)
* NodeJS Instalado na máquina.

## 🚀 Instalação

Para instalação e funcionamento, siga estas etapas:

### Clonar Projeto
```
git clone https://github.com/saviopinho/Node-API-Cubos-Typescript.git
```

## Configurar Variáveis de Ambiete
O arquivo .env já está preenchido com os dados necessários para o funcionamento padrão.

### Acessar raiz do projeto
```
cd Node-API-Cubos-Typescript
```

### Instalar Packages
```
npm install
```

### Criar e subir container PostgresSQL com Docker
```
npm run docker:compose
```

### Criar arquivo de migrations do TypeORM
```
npm run migration:generate
```

### Executar as migrations do TypeORM
```
npm run migration:run
```
### Iniciar nosso servidor API 
* Caso queira rodar o servidor e testar manualmente
```
npm run start
```
* Caso queria rodar os testes de integração
```
npm run test
```

## ☕ Observações

* Em caso de conflito de portas ao executar o comando docker compose, realizar todo o processo do início, porém alterando o .env para as portas que estarão disponíveis
* Usar a ferramenta de sua preferência para testar as rotas e os endpoints criados
