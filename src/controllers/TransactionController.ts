import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { TransactionService } from "../services/TransactionService";
import { TransactionRepo } from "../repositories/TransactionRepository";
import { AccountRepo } from "../repositories/AccountRepository";


const transactionService = new TransactionService(new TransactionRepo(), new AccountRepo())

export const depositMoneyToAccount = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {
        const accountId = Number(req.params.account_id)
        const amount = req.body.amount;


        if (isNaN(accountId)) {
            res.status(400).json({ message: "Invalid account_id" });
            return;
        }

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            res.status(400).json({ message: "Amount must be a positive number" });
            return;
        }

        res.status(200).json({ data: await transactionService.deposit(accountId, amount) });

    },
);

export const withdrawMoneyToAccount = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {
        const accountId = Number(req.params.account_id)
        const amount = req.body.amount;


        if (isNaN(accountId)) {
            res.status(400).json({ message: "Invalid account_id" });
            return;
        }

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            res.status(400).json({ message: "Amount must be a positive number" });
            return;
        }

        res.status(200).json({ data: await transactionService.withdraw(accountId, amount) });

    },
);



