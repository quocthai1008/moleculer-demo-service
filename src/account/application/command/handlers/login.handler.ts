import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountRepositoryImpl } from "../../../infrastructure/repositories/user.repository";
import { LoginCommand } from "../impl/login.command";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, string> {
	constructor(private readonly repository: AccountRepositoryImpl) {}

	async execute(command: LoginCommand): Promise<string> {
		console.log("Login command...");
		const { username, password } = command;
		const account = await this.repository.login(username, password);
		return account;
	}
}
