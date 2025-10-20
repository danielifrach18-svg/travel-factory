import "dotenv/config";
import express from "express";
import chalk from "chalk";
import cors from "cors";
import morgan from "./logger/morgan";
import db from "./config/db.config";
import "./models/animal.js";
import "./models/event.js";
import animalsRouter from "./animals/routes/animalsRouter";

const app = express();

app.use(morgan);
app.use(cors());
app.use(express.json());
app.use("/api/animals", animalsRouter);

const PORT = process.env.PORT || 3000;

const initializeApp = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: false });

    console.log(
      chalk.green("Database connection successful and models synced")
    );

    app.listen(PORT, () => {
      console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
    });
  } catch (error) {
    console.error(chalk.red(error));
  }
};

initializeApp();
