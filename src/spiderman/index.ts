import dayjs from "dayjs";
import bcrypt from "bcrypt";
import knex from "./knex";
import express from "./express";
import jwt from "./jwt";

console.log("run spiderman");

export default {
  dayjs: dayjs,
  bcrypt: bcrypt,
  knex: knex(),
  express: express(),
  jwt: jwt(),
};
