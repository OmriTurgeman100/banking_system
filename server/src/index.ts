import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import AppError from "./utils/AppError";
import { GlobalError } from "./utils/GlobalError";
import accountRouter from "./routers/AccountRouter"
import transactionRouter from "./routers/TransactionRouter"
import pool from "./database/database"

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/health", async (req: Request, res: Response, next: NextFunction) => {

  try {
    await pool.query("select 1;") // * simple query which checks communication with the database.

    res.status(200).json({
      database: "postgres",
      status: "up"
    })

  } catch (error) {
    res.status(500).json({
      database: "postgres",
      status: "error"
    })
  }
})

app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/transactions", transactionRouter);


app.use("*", (req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`Cant find ${req.originalUrl} on the server`, 404));
});

app.use(GlobalError);

app.listen(port, () => {
  console.log(
    `🚀 Server is up and running! Access it at: http://localhost:${port}/`
  );
});