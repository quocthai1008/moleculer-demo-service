import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountRepositoryImpl } from "../../../infrastructure/repositories/user.repository";
import { ChangePasswordCommand } from "../impl/change-password.command";

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
	implements ICommandHandler<ChangePasswordCommand, string>
{
	constructor(private readonly repository: AccountRepositoryImpl) {}

	async execute(command: ChangePasswordCommand): Promise<string> {
		console.log("Change password command...");
		const { userId, username, oldPassword, newPassword } = command;
		const account = await this.repository.changePassword(
			userId,
			username,
			oldPassword,
			newPassword
		);
		return account;
	}
}
