import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { ChangePasswordCommand } from "../application/command/impl/change-password.command";
import { LoginCommand } from "../application/command/impl/login.command";
import { RegisterCommand } from "../application/command/impl/register.command";
import { UpdateCommand } from "../application/command/impl/update.command";
import { GetInfoQuery } from "../application/query/impl/get-info.query";
import { AccountRepository } from "../domain/repository";
import { Account } from "../infrastructure/model/account.model";

@Controller()
export class AccountProvider implements AccountRepository {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}
	verifyToken(token: string): string | JwtPayload {
		throw new Error("Method not implemented.");
	}
	update(
		userId: mongoose.Types.ObjectId,
		fullName: string,
		address: string
	): Promise<string> {
		return this.commandBus.execute(
			new UpdateCommand(userId, fullName, address)
		);
	}
	changePassword(
		userId: mongoose.Types.ObjectId,
		username: string,
		oldPassword: string,
		newPassword: string
	): Promise<string> {
		return this.commandBus.execute(
			new ChangePasswordCommand(
				userId,
				username,
				oldPassword,
				newPassword
			)
		);
	}
	getAccountById(userId: mongoose.Types.ObjectId): Promise<Account> {
		return this.queryBus.execute(new GetInfoQuery(userId));
	}
	checkAccountExist(userId: mongoose.Types.ObjectId): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	public async register(username: string, password: string) {
		return this.commandBus.execute(new RegisterCommand(username, password));
	}

	public login(username: string, password: string) {
		return this.commandBus.execute(new LoginCommand(username, password));
	}
}
