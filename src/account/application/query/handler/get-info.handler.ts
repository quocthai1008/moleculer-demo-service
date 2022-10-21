import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AccountRepository } from "../../../domain/repository";
import { Account } from "../../../infrastructure/model/account.model";
import { GetInfoQuery } from "../impl/get-info.query";

@QueryHandler(GetInfoQuery)
export class GetInfoHandler implements IQueryHandler<GetInfoQuery, Account> {
	constructor(private readonly repository: AccountRepository) {}

	async execute(query: GetInfoQuery): Promise<Account> {
		console.log("Query info user...");
		const { userId } = query;
		const account = await this.repository.getAccountById(userId);
		return account;
	}
}
