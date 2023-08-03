import dayjs from "dayjs";
import bcrypt from "bcrypt";
import mysql from "./mysql";
import express from "./express";
import jwt from "./jwt";

export default {
  dayjs: dayjs,
  bcrypt: bcrypt,
  mysql: mysql(),
  express: express(),
  jwt: jwt(),
};
