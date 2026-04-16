import pool from "../database/database";
import { IAccount, IPerson, IAccountRepository, IAccountBalance } from "../interfaces/Account";

export class AccountRepo implements IAccountRepository {


    async createAccount(personId: number): Promise<IAccount> {

        const result = await pool.query("insert into accounts (personId) values ($1) returning *;", [personId])

        return result.rows[0];
    }


    async findPersonById(personId: number): Promise<IPerson | null> {
        const result = await pool.query("select * from persons where personId = $1;", [personId])


        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }

    async findAccountById(accountId: number): Promise<IAccount | null> {
        const result = await pool.query("select * from accounts where accountId = $1;", [accountId])

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }

    async findAccountBalance(accountId: number): Promise<IAccountBalance> {

        const result = await pool.query("select accountId, balance from accounts where accountId = $1;", [accountId])

        return result.rows[0]

    }

    async blockSpecifiedAccount(accountId: number, block: boolean): Promise<IAccount> {

        const result = await pool.query("update accounts set blockedflag = $1 where accountId = $2 returning *;", [block, accountId])

        return result.rows[0]

    }

}