// 使用 .env
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
// import https from 'https';
import spiderman from "./spiderman";
import routes from "./routes";

(async () => {
  await spiderman.mysql.connect();

  const app = express();
  app.use(spiderman.express.log);
  app.use(express.json());
  app.use(routes);
  app.use(spiderman.express.errorHandler);

  const port = 3000;
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
})();
