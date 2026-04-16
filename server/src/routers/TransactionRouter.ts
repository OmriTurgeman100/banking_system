import express from "express";
import * as TransactionController from "../controllers/TransactionController"

const router = express.Router();

router
    .route("/deposit/:account_id")
    .post(TransactionController.depositMoneyToAccount);

router
    .route("/withdraw/:account_id")
    .patch(TransactionController.withdrawMoneyToAccount);

router
    .route("/view/:account_id")
    .get(TransactionController.chckUserTransactions);


export default router;