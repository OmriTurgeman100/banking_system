import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { AccountRepo } from "../repositories/AccountRepository";
import { AccountService } from "../services/AccountService";

const accountService = new AccountService(new AccountRepo())

export const create_account = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {

        const person_id = Number(req.body.person_id)

        if (isNaN(person_id)) {
            res.status(400).json({ message: "Invalid person_id" });
            return;
        }

        res.status(200).json({ data: await accountService.create_new_account(person_id) });

    },
);


export const display_account_balance = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {

        const account_id = Number(req.params.account_id)

        if (isNaN(account_id)) {
            res.status(400).json({ message: "Invalid account_id" });
            return;
        }

        res.status(200).json({ data: await accountService.find_account_balance(account_id) });

    },
);

export const block_account = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {

        const account_id = Number(req.params.account_id)

        const block = req.body.block;

        if (isNaN(account_id)) {
            res.status(400).json({ message: "Invalid account_id" });
            return;
        }

        if (typeof block !== "boolean") {
            res.status(400).json({
                message: "block must be a boolean (true/false)"

            });

            return
        }


        res.status(200).json({ data: await accountService.block_selected_account(account_id, block) });

    },
);
