import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Account } from "../../../infrastructure/model/account.model";
import { AccountRepositoryImpl } from "../../../infrastructure/repositories/user.repository";
import { GetInfoQuery } from "../impl/get-info.query";

@QueryHandler(GetInfoQuery)
export class GetInfoHandler implements IQueryHandler<GetInfoQuery, Account> {
	constructor(private readonly repository: AccountRepositoryImpl) {}

	async execute(query: GetInfoQuery): Promise<Account> {
		console.log("Query info user...");
		const { userId } = query;
		const account = await this.repository.getAccountById(userId);
		return account;
	}
}
