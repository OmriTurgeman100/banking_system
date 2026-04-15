import AppError from "../utils/AppError";
import { IAccountRepository } from "../interfaces/Account";

export class AccountService {
    private readonly repo: IAccountRepository

    constructor(repo: IAccountRepository) {
        this.repo = repo
    }

    async create_new_account(person_id: number) {

        const specified_person = await this.repo.findPersonById(person_id)


        if (!specified_person) {
            throw new AppError("Person not found", 400)
        }


        const user = await this.repo.create_account(person_id)

        return user
    }

    async find_account_balance(account_id: number) {
        const specified_account = await this.repo.findAccountById(account_id)

        if (!specified_account) {
            throw new AppError("Account not found", 400)
        }


        if (specified_account.blockedflag) {
            throw new AppError("You are blocked", 401)
        }


        const balance = await this.repo.findAccountBalance(account_id)

        return balance

    }

    async block_selected_account(account_id: number, state: boolean) {
        const specified_account = await this.repo.findAccountById(account_id)

        if (!specified_account) {
            throw new AppError("Account not found", 400)
        }

        const account = await this.repo.block_specified_account(account_id, state)

        return account

    }

}