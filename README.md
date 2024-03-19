
# Pokedex Server


## Run Locally

Clone the project

```bash
  git clone https://github.com/MrLuis-WebMaster/pokedex-server.git
```

Go to the project directory

```bash
  cd pokedex-server
```

Install dependencies

```bash
  npm install
```
Copy the .env.template file to create a new .env file and add the necessary environment variable values.

Open the .env file and add the corresponding values.


Start the server prod mode

```bash
  npm start
```
Start the server dev mode

```bash
  npm run dev
```

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MySQL
- Sequelize
- jsonwebtoken
- Class-Validator
- Railway (Deployment)

## Table Structure: `pokemons`

| Field       | Type        |
|-------------|-------------|
| id          | int (PK)    |
| name        | varchar(255)|
| color       | varchar(255)|
| idPokemon   | int         |
| createdAt   | datetime    |
| updatedAt   | datetime    |


## Live Demo
Explore the application at:

[DEMO](https://pokedex-frontend-dusky.vercel.app/)
