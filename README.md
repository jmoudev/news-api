News platform API containing topics, users, articles, and comments. The project is built using postgreSQL database with knex connetcion, also making use of routing using express. The API follows RESTful principles, and the MVC model.

Link to the hosted version of web page is https://news-platform.herokuapp.com/api.

Tech

- PostgreSQL
- Knex
- Express
- Jest
- Supertest
- Nodemon

Getting Started

Required tech

- Node.js
- postgreSQL

To fully utilise the back end API, clone the project to a local folder, and install project dependencies from the project folder with the following command:

npm install

Create a knexfile to connect to postgreSQL in the following format:

---

const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
client: 'pg',
migrations: {
directory: './db/migrations'
},
seeds: {
directory: './db/seeds'
}
};

const customConfigs = {
production: {
connection: {
connectionString: DB_URL,
ssl: {
rejectUnauthorized: false
}
}
},
development: {
connection: {
database: 'nc_news',
password: 'password'
}
},
test: {
connection: {
database: 'nc_news_test',
password: 'password'
}
}
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

---

For further details on knexfile creation see knex docs
http://knexjs.org/#knexfile.

Then seed the local postgreSQL database using the scripts in the package.json file:

npm run setup-dbs

npm run seed-test
npm run seed-dev
npm run seed-prod

The dbs will now be seeded and you can proceed to run tests.

To run the test file:

npm t app
