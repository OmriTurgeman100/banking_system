import express from "express";
import * as AccountController from '../controllers/AccountController'

const router = express.Router();

router
    .route("/create")
    .post(AccountController.createAccount);

router
    .route("/balance/:account_id")
    .get(AccountController.displayAccountBalance);

router
    .route("/block/:account_id")
    .patch(AccountController.blockAccount);

export default router;