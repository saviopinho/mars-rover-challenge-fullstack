![exemplo imagem](https://media-exp1.licdn.com/dms/image/D4D0BAQHB4UiiPJpO2A/company-logo_100_100/0/1664893430143?e=1677110400&v=beta&t=8ULE0gmaHsgRkmCCzN_ZhSCmuLh7Ot_-mcCcMPFDHBo)
#### Mars Rover Challenge - Teste Emana Group</>

> ## Backend:
* NodeJS
* Javascript 
* ExpressJS 
* PostgresSQL
* Sequelize

> ## Frontend
* ReactJS

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover , NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y + 1).

Input
The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover’s position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover’s orientation.

Each rover will be finished sequentially, which means that the second rover won’t start to move until the first one has finished moving.

Output
The output for each rover should be its final co-ordinates and heading.

Rover Data Example
Example 1
Landing Position: 1 2 N
Instruction: LMLMLMLMM
Final Position: 1 3 N

Example 2
Landing Position: 3 3 E
Instruction: MRRMMRMRRM
Final Position: 2 3 S

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## ✅ Funcionalidades
- Realizar o deploy desses rovers, bem como as validações de regras, através do Frontend criado especificamente para consumir essa API desenvolvida.
- Salvar os registros dos deploys dos rovers na base de dados PostgresSQL. 
- Listar o resultados dos deploys através de um Report que pode ser executado direto do Frontend.

## ✅ Endpoints
* POST /rover
* GET /rover

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Ter o Docker instalado (preferência mais atualizado) e rodando para que seja criada a base de dados dessa aplicação. (Procurar fechar todos os serviços e containeres que já estiverem rodando para evitar conflito de portas)

* NodeJS Instalado na máquina.

## 🚀 Instalação

Para instalação e funcionamento, siga estas etapas:

### Abrir um terminal e direcionar para a pasta onde irá clonar nosso projeto

### Clonar Projeto
```
git clone https://github.com/saviopinho/emana-teste-fullstack.git
```
## BACKEND

## Variáveis de Ambiete Backend
O arquivo .env já está preenchido com os dados necessários para o funcionamento padrão.
```
NODE_ENV=development
EXTERNAL_PORT=3001
DB_PORT=5433
POSTGRES_HOST=localhost
POSTGRES_USER=emana
POSTGRES_PASSWORD=12345
POSTGRES_DB=postgres
```

### Acessar raiz do projeto
```
cd emana-teste-fullstack
```

### Acessar raiz do Backend
```
cd backend
```

### Instalar Packages do Backend (Aguardar alguns minutos para o término da instalação)
```
npm install
```

### Criar e subir container PostgresSQL com Docker
```
npm run docker:compose:down

npm run docker:compose:up
```

### Executar a migration da tabela de backlog
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
------------------------------------------------------------------------------------------------------------
### FRONTEND

### Agora abra um novo terminal para o Frontend na pasta onde o projeto foi clonado

### Acessar raiz do projeto
```
cd emana-teste-fullstack
```

### Acessar raiz do Frontend
```
cd frontend
```

### Instalar Packages do Frontend (Aguardar alguns minutos para o término da instalação)
```
npm install
```

### Executar nossa página de consumo do serviço criado (Aguardar enquanto a página abre)
```
npm run start
```
## Variáveis de Ambiete Frontend
O arquivo .env já está preenchido com os dados necessários para o funcionamento padrão, mas caso haja necessidade, a porta do serviço tanto no Backend, quanto no
Frontend deverão ser as mesmas, neste caso, para o Backend a porta 3001 foi configurada, e para o Frontend a porta 8081

```
NODE_ENV=development
REACT_APP_API=http://localhost:3001/rover
PORT=8081
```
## ☕ Observações

* Lembrar que para o funcionamento normal da nossa aplicação, o Backend e o Frontend deverão estar rodando ao mesmo tempo, bem como o container do postgresSql no Docker.
