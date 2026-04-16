import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { TransactionService } from "../services/TransactionService";
import { TransactionRepo } from "../repositories/TransactionRepository";
import { AccountRepo } from "../repositories/AccountRepository";
import pool from "../database/database";


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


export const chckUserTransactions = CatchAsync(

    async (req: Request, res: Response): Promise<void> => {
        const accountId = Number(req.params.account_id)


        const { startDate, endDate } = req.query

        if (startDate && endDate) {
            const data = await pool.query(`
            with account_transactions as (
                select accounts.accountid, persons.name, transactions.transactiondate,
                transactions.type, transactions.value
                from transactions
                inner join accounts on accounts.accountid  = transactions.accountid
                inner join persons on persons.personid = accounts.accountid
                where accounts.accountid = $1
            ) select * from account_transactions
            where transactiondate >= $2
            and transactiondate <= $3;
        `, [accountId, startDate, endDate])
            res.status(200).json({ data: data.rows });
            return;
        }

        const data = await pool.query(`
            with account_transactions as (
                select accounts.accountid, persons.name, transactions.transactiondate,
                transactions.type, transactions.value
                from transactions
                inner join accounts on accounts.accountid  = transactions.accountid
                inner join persons on persons.personid = accounts.accountid
                where accounts.accountid = $1
            ) select * from account_transactions;
        `, [accountId])

        res.status(200).json({ data: data.rows });

    },
);