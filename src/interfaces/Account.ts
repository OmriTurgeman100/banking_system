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

export interface IAccountRepository {
    create_account(personId: number): Promise<IAccount>

    findPersonById(person_id: number): Promise<IPerson | null>

    findAccountById(account_id: number): Promise<IAccount | null>

    findAccountBalance(account_id: number): Promise<string>

    block_specified_account(account_id: number, block: boolean): Promise<IAccount>

}