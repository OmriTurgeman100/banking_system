import AppError from "../utils/AppError";
import { IAccountRepository } from "../interfaces/Account";

export class AccountService {
    private readonly repo: IAccountRepository

    constructor(repo: IAccountRepository) {
        this.repo = repo
    }

    async createNewAccount(personId: number) {

        const specifiedPerson = await this.repo.findPersonById(personId)


        if (!specifiedPerson) {
            throw new AppError("Person not found", 400)
        }


        const user = await this.repo.createAccount(personId)

        return user
    }

    async findAccountBalance(accountId: number) {
        const specifiedAccount = await this.repo.findAccountById(accountId)

        if (!specifiedAccount) {
            throw new AppError("Account not found", 400)
        }


        if (specifiedAccount.blockedflag) {
            throw new AppError("You are blocked", 401)
        }


        const balance = await this.repo.findAccountBalance(accountId)

        return balance

    }

    async blockSelectedAccount(accountId: number, state: boolean) {
        const specifiedAccount = await this.repo.findAccountById(accountId)

        if (!specifiedAccount) {
            throw new AppError("Account not found", 400)
        }

        const account = await this.repo.blockSpecifiedAccount(accountId, state)

        return account

    }

}