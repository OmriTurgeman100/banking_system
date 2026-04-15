export interface IPerson {
    personId: number;
    name: string;
    document: string;
    birthDate: string;
}

export interface IAccount {
    accountId: number;
    personId: number;
    balance: number;
    dailyWithdrawalLimit: number;
    blockedflag: boolean;
    accountType: string
    createDate: string;
}

export interface IAccountBalance {
    accountId: number;
    balance: number;
}

export interface IAccountRepository {
    createAccount(personId: number): Promise<IAccount>

    findPersonById(personId: number): Promise<IPerson | null>

    findAccountById(accountId: number): Promise<IAccount | null>

    findAccountBalance(accountId: number): Promise<IAccountBalance>

    blockSpecifiedAccount(accountId: number, block: boolean): Promise<IAccount>

}