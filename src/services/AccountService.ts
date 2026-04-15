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

}