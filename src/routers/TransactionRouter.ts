import express from "express";
import * as AccountController from '../controllers/AccountController'
import * as TransactionController from "../controllers/TransactionController"

const router = express.Router();

router
    .route("/deposit/:account_id")
    .post(TransactionController.deposit_money_to_account);

router
    .route("/balance/:account_id")
    .get(AccountController.create_account);

router
    .route("/balance/:account_id")
    .patch(AccountController.create_account);

export default router;