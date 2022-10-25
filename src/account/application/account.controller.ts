import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { ChangePasswordCommand } from "./command/impl/change-password.command";
import { LoginCommand } from "./command/impl/login.command";
import { RegisterCommand } from "./command/impl/register.command";
import { UpdateCommand } from "./command/impl/update.command";
import { GetInfoQuery } from "./query/impl/get-info.query";
import { AccountRepository } from "../domain/repository";
import { Account } from "../infrastructure/model/account.model";

@Controller()
export class AccountController implements AccountRepository {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}
	verifyToken(token: string): string | JwtPayload {
		throw new Error("Method not implemented.");
	}
	async update(
		userId: mongoose.Types.ObjectId,
		fullName: string,
		address: string
	): Promise<string> {
		return await this.commandBus.execute(
			new UpdateCommand(userId, fullName, address)
		);
	}
	async changePassword(
		userId: mongoose.Types.ObjectId,
		username: string,
		oldPassword: string,
		newPassword: string
	): Promise<string> {
		return await this.commandBus.execute(
			new ChangePasswordCommand(
				userId,
				username,
				oldPassword,
				newPassword
			)
		);
	}
	async getAccountById(userId: mongoose.Types.ObjectId): Promise<Account> {
		return await this.queryBus.execute(new GetInfoQuery(userId));
	}
	checkAccountExist(userId: mongoose.Types.ObjectId): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async register(username: string, password: string) {
		return await this.commandBus.execute(
			new RegisterCommand(username, password)
		);
	}

	async login(username: string, password: string) {
		return await this.commandBus.execute(
			new LoginCommand(username, password)
		);
	}
}
