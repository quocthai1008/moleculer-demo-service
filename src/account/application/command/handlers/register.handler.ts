import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountRepositoryImpl } from "../../../infrastructure/repositories/user.repository";
import { RegisterCommand } from "../impl/register.command";

@CommandHandler(RegisterCommand)
export class RegisterHandler
	implements ICommandHandler<RegisterCommand, string>
{
	constructor(private readonly repository: AccountRepositoryImpl) {}

	async execute(command: RegisterCommand): Promise<string> {
		console.log("Register command...");
		const { username, password } = command;
		const account = await this.repository.register(username, password);
		return account;
	}
}
