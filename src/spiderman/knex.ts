import { Knex, knex } from "knex";

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "home",
  },
};

const knexInstance = knex(config);

export default () => knexInstance;
