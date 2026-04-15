import express from "express";
import * as AccountController from '../controllers/AccountController'

const router = express.Router();

router
    .route("/create")
    .post(AccountController.create_account);

export default router;