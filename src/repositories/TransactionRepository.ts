import pool from "../database/database";
import { ITransactionRepository } from "../interfaces/Transaction";

export class TransactionRepo implements ITransactionRepository {

  async deposit_money(accountId: number, balance: number): Promise<string> {
    // * starting a transaction
    // * sucesss means everything worked, partial sucesss doesn't count and will cause a rollback.

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      await client.query(
        "UPDATE accounts SET balance = balance + $1 WHERE accountId = $2 RETURNING *;",
        [balance, accountId]
      );

      await client.query("insert into transactions (accountid, value, type) values ($1, $2, $3); ", [accountId, balance, "deposit"])

      await client.query("COMMIT;");

      return `transaction succeed, deposited $${balance}`;
    } catch (error) {
      await client.query("ROLLBACK");
      return "failed";
    } finally {
      client.release();
    }
  }

}