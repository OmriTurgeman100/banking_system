export interface ITransactionRepository {

    deposit_money(accountId: number, balance: number): Promise<string>

}