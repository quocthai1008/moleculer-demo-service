import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { Account } from "../../schemas/account.schema";
import { AccountHandler } from "./account.handler";
import { JwtPayload } from "jsonwebtoken";

@Controller()
export class AccountController {
	static accountHandler: AccountHandler;
	constructor(accountHandler: AccountHandler) {
		AccountController.accountHandler = accountHandler;
	}
	static register(username: string, password: string): Promise<string> {
		return AccountController.accountHandler.register(username, password);
	}
	static login(username: string, password: string): Promise<string> {
		return AccountController.accountHandler.login(username, password);
	}
	static verifyToken(token: string): JwtPayload | string {
		return AccountController.accountHandler.verifyToken(token);
	}
	static getInfoById(userId: mongoose.Types.ObjectId): Promise<Account> {
		return AccountController.accountHandler.getAccountById(userId);
	}
	static update(
		userId: mongoose.Types.ObjectId,
		fullName: string,
		address: string
	): Promise<string | Error> {
		return AccountController.accountHandler.update(
			userId,
			fullName,
			address
		);
	}
	static changePassword(
		userId: mongoose.Types.ObjectId,
		username: string,
		oldPassword: string,
		newPassword: string
	): Promise<string> {
		return AccountController.accountHandler.changePassword(
			userId,
			username,
			oldPassword,
			newPassword
		);
	}
	static checkAccountExist(
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		return AccountController.accountHandler.checkAccountExist(userId);
	}
}
