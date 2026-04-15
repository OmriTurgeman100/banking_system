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
    blockedFlag: boolean;
    accountType: string
    createDate: string;
}

export interface IAccountRepository {
    create_account(personId: number): Promise<IAccount>

    findPersonById(person_id: number): Promise<IPerson | null>

}