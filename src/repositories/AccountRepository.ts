import pool from "../database/database";
import { IAccount, IPerson, IAccountRepository } from "../interfaces/Account";

export class AccountRepo implements IAccountRepository {


    async create_account(personId: number): Promise<IAccount> {

        const result = await pool.query("insert into accounts (personId) values ($1) returning *;", [personId])

        return result.rows[0];
    }


    async findPersonById(person_id: number): Promise<IPerson | null> {
        const result = await pool.query("select * from persons where personId = $1;", [person_id])


        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }

    async findAccountById(account_id: number): Promise<IAccount | null> {
        const result = await pool.query("select * from accounts where accountId = $1;", [account_id])

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }

    async findAccountBalance(account_id: number): Promise<string> {

        const result = await pool.query("select balance from accounts where accountId = $1;", [account_id])


        return `your balance is $${result.rows[0].balance}`

    }

    async block_specified_account(account_id: number, block: boolean): Promise<IAccount> {

        const result = await pool.query("update accounts set blockedflag = $1 where accountId = $2 returning *;", [block, account_id])

        return result.rows[0]

    }

}