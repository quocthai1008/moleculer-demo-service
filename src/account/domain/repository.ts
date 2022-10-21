import mongoose from "mongoose";
import { Account } from "../infrastructure/model/account.model";
import { JwtPayload } from "jsonwebtoken";

export interface AccountRepository {
	register(username: string, password: string): Promise<string>;
	login(username: string, password: string): Promise<string>;
	verifyToken(token: string): JwtPayload | string;
	update(
		userId: mongoose.Types.ObjectId,
		fullName: string,
		address: string
	): Promise<string | Error>;
	changePassword(
		userId: mongoose.Types.ObjectId,
		username: string,
		oldPassword: string,
		newPassword: string
	): Promise<string>;
	getAccountById(userId: mongoose.Types.ObjectId): Promise<Account>;
	checkAccountExist(userId: mongoose.Types.ObjectId): Promise<boolean>;
}
