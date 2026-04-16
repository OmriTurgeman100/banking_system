import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { AccountRepo } from "../repositories/AccountRepository";
import { AccountService } from "../services/AccountService";

const accountService = new AccountService(new AccountRepo())

export const createAccount = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {

        const personId = Number(req.body.person_id)

        if (isNaN(personId)) {
            res.status(400).json({ message: "Invalid person_id" });
            return;
        }

        res.status(201).json({ data: await accountService.createNewAccount(personId) });

    },
);


export const displayAccountBalance = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {

        const accountId = Number(req.params.account_id)

        if (isNaN(accountId)) {
            res.status(400).json({ message: "Invalid account_id" });
            return;
        }

        res.status(200).json({ data: await accountService.findAccountBalance(accountId) });

    },
);

export const blockAccount = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {

        const accountId = Number(req.params.account_id)

        const block = req.body.block;

        if (isNaN(accountId)) {
            res.status(400).json({ message: "Invalid account_id" });
            return;
        }

        if (typeof block !== "boolean") {
            res.status(400).json({
                message: "block must be a boolean (true/false)"

            });

            return
        }


        res.status(200).json({ data: await accountService.blockSelectedAccount(accountId, block) });

    },
);
