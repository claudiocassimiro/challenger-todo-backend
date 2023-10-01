import express = require("express");
import bodyParser = require("body-parser");
import { AppDataSource } from "./data-source";
import routes from "./routes";
import "dotenv/config";
const cors = require("cors");

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(routes);

    app.listen(process.env.PORT || 3001);

    console.log(
      `Express server has started on port ${process.env.PORT || 3001}.`
    );
  })
  .catch((error) => console.log(error));
