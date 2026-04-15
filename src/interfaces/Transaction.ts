export interface ITransactionRepository {

    deposite_money(accountId: number, balance: number): string
    
    
}