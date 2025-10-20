import { Sequelize } from "sequelize";
import "dotenv/config";

interface DB {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
}

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
  }
);

const db: DB = {
  Sequelize,
  sequelize,
};

export default db;
