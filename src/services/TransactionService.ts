import AppError from "../utils/AppError";
import { ITransactionRepository } from "../interfaces/Transaction";
import { IAccountRepository } from "../interfaces/Account";

export class TransactionService {
    private readonly repo: ITransactionRepository
    private readonly external_account_repo: IAccountRepository

    constructor(repo: ITransactionRepository, external_account_repo: IAccountRepository) {
        this.repo = repo
        this.external_account_repo = external_account_repo
    }

    async deposit(accountId: number, amount: number,) {

        const account = await this.external_account_repo.findAccountById(accountId)

        if (!account) {
            throw new AppError("Account not found", 400)
        }

        const result = await this.repo.deposit_money(accountId, amount)

        return result

    }
}