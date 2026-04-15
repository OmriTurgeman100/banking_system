import express from "express";
import * as AccountController from '../controllers/AccountController'

const router = express.Router();

router
    .route("/create")
    .post(AccountController.create_account);

router
    .route("/balance/:account_id")
    .get(AccountController.display_account_balance);

router
    .route("/block/:account_id")
    .patch(AccountController.block_account);

export default router;