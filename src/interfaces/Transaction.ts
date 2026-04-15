import { IAccount } from "./Account"


export interface ITransactionRepository {

    depositMoney(accountId: number, balance: number): Promise<IAccount>

    withdrawMoney(accountId: number, balance: number): Promise<IAccount>

}