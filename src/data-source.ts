import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Task } from "./entity/Task";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Task],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
  extra: {
    ssl: process.env.NODE_ENV === "production",
  },
});
