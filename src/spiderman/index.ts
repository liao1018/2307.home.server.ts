import dayjs from "dayjs";
import mysql from "./mysql";
import express from "./express";
import jwt from "./jwt";

export default {
  dayjs: dayjs(),
  mysql: mysql(),
  express: express(),
  jwt: jwt(),
};
