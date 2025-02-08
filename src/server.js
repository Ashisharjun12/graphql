import express from "express";
import { _config } from "./config/config.js";
import { expressMiddleware } from "@apollo/server/express4";
import logger from "./utils/logger.js";
import cors from "cors";
import morgan from "morgan";
import { createAppoloGqlServer } from "./graphql/index.js";

const app = express();
const PORT = _config.PORT;

app.use(
  "/graphql",
  cors(),
  express.json(),
  morgan("dev"),
  expressMiddleware(await createAppoloGqlServer())
);


app.get("/health", (req, res) => res.sendStatus(200));

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}/graphql`);
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
