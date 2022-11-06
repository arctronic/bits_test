import express from "express";
import cors from "cors";
import morganBody from "morgan-body";

import config from "./config";

import { httpLogger } from "./utils/log/http-logger.util";
import { productRouter } from "./modules/product/products.router";


// Initialization
const app = express();

// Configuration
app.set("port", config.port);

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP loggers
morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false,
  logIP: false,
  maxBodyLength: 1024
});

app.use(httpLogger);
app.use(productRouter)
// console.log(config.token)
// Routes


export default app;