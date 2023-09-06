require("module-alias/register");
// 使用 .env
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import https from "https";
import spiderman from "@/spiderman";

import routes from "@/routes";

(async () => {
  const app = express();
  app.use(spiderman.express.log);
  app.use(express.json());
  app.use(routes);
  app.use(spiderman.express.errorHandler);

  // 新增 http server
  (() => {
    const httpPort = 3000;
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort, () => {
      console.log(`http app listening on port ${httpPort}`);
    });
  })();

  // 新增 https server
  (() => {
    const privateKey = process.env.SERVER_KEY;
    const certificate = process.env.SERVER_CERT;
    const credentials = { key: privateKey, cert: certificate };
    const httpsPort = 3001;
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort, () => {
      console.log(`https app listening on port ${httpsPort}`);
    });
  })();
})();
