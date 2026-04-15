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


