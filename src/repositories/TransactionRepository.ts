import pool from "../database/database";
import { ITransactionRepository } from "../interfaces/Transaction";
import AppError from "../utils/AppError";
import { IAccount } from "../interfaces/Account";

export class TransactionRepo implements ITransactionRepository {

  async depositMoney(accountId: number, balance: number): Promise<IAccount> {
    // * starting a transaction
    // * sucesss means everything worked, partial sucesss doesn't count and will cause a rollback.

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const results = await client.query(
        "UPDATE accounts SET balance = balance + $1 WHERE accountId = $2 RETURNING *;",
        [balance, accountId]
      );

      await client.query("insert into transactions (accountid, value, type) values ($1, $2, $3); ", [accountId, balance, "deposit"])

      await client.query("COMMIT;");

      return results.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new AppError("Deposit transaction has failed.", 500);
    } finally {
      client.release(); // * release connection back to the pool
      // * I had to use the client for transactions, using the pool variable (used in rest of the code) can use different connection each time,
    }
  }

  async withdrawMoney(accountId: number, balance: number): Promise<IAccount> {

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const results = await client.query(
        "UPDATE accounts SET balance = balance - $1 WHERE accountId = $2 RETURNING *;",
        [balance, accountId]
      );

      await client.query("insert into transactions (accountid, value, type) values ($1, $2, $3); ", [accountId, balance, "withdraw"])

      await client.query("COMMIT;");

      return results.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw new AppError("Withdraw transaction has failed.", 500);
    } finally {
      client.release();
    }
  }

}

