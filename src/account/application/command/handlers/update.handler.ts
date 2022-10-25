import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountRepositoryImpl } from "../../../infrastructure/repositories/user.repository";
import { UpdateCommand } from "../impl/update.command";

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand, string> {
	constructor(private readonly repository: AccountRepositoryImpl) {}

	async execute(command: UpdateCommand): Promise<string> {
		console.log("Update command...");
		const { userId, fullName, address } = command;
		const account = await this.repository.update(userId, fullName, address);
		return account;
	}
}
