import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(routes);

    app.listen(3000);

    console.log("Express server has started on port 3000.");
  })
  .catch((error) => console.log(error));
