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


}