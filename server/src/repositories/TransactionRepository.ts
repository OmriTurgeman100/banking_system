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


  async hasExceededWithdrawLimit(
    accountId: number,
    amount: number,
    limit: number
  ): Promise<boolean> {
    // * function which checks if user has passed his daily amount, some users can have no transactions and return null in value column.
    // * I used coalesce in order to safely return 0 instead of null.
    // * if user has passed his daily limit code returns true, else false.
    // * the code checks the sum of the withdraw transactions during the day along with the amount user was looking to pull out, if all of that is > daily limit it returns true.
    // * true means user has passed his daily limit.
    const result = await pool.query<{ data: boolean }>(
      `
        WITH money_spent AS (
          SELECT COALESCE(SUM(value), 0) AS amount
          FROM transactions
          WHERE transactionDate = CURRENT_DATE
            AND accountId = $1
            AND type = 'withdraw'
        )
        SELECT
          CASE
            WHEN amount + $2 > $3 THEN true
            ELSE false
          END AS data
        FROM money_spent;
    `,
      [accountId, amount, limit]
    );

    return result.rows[0].data;
  }
}


