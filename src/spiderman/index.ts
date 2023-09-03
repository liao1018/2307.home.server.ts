import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { z } from "zod";
import knex from "./knex";
import express from "./express";
import jwt from "./jwt";

console.log("run spiderman");

export default {
  dayjs,
  bcrypt,
  z,
  knex: knex(),
  express: express(),
  jwt: jwt(),
};
