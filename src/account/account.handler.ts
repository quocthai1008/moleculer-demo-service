import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { DbConfig } from "../../config/db.config";
import { InjectModel } from "@nestjs/mongoose";
import { AccountRepository } from "./account.repository";
import { Account, AccountSchema } from "../../schemas/account.schema";
import { hash, compare } from "bcryptjs";
import { sign, verify, JwtPayload } from "jsonwebtoken";

@Injectable()
export class AccountHandler implements AccountRepository {
	constructor(
		@InjectModel(Account.name)
		private accountModel: mongoose.Model<Account>
	) {}

	public async checkAccountExist(
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const model = await this.getAccountModel();
		const check = await model.findOne({ _id: userId }).select("_id").lean();
		return check ? true : false;
	}

	public async update(
		userId: mongoose.Types.ObjectId,
		fullName: string,
		address: string
	): Promise<string | Error> {
		const model = await this.getAccountModel();
		const result = await model.updateOne(
			{ _id: userId },
			{ fullName, address }
		);
		return result.matchedCount !== 0
			? "Update user success"
			: "_id not match";
	}

	public async changePassword(
		userId: mongoose.Types.ObjectId,
		username: string,
		oldPassword: string,
		newPassword: string
	): Promise<string> {
		const model = await this.getAccountModel();
		const account = await this.getAccountByName(username);
		const check = await compare(oldPassword, account.password);
		if (!check) {
			return "Old password invalid";
		}

		const hashPassword = await hash(newPassword, 10);
		const result = await model.updateOne(
			{ _id: userId },
			{ password: hashPassword }
		);

		return result.matchedCount !== 0
			? "Update password success"
			: "_id not match";
	}

	public async getAccountById(
		userId: mongoose.Types.ObjectId
	): Promise<Account> {
		const model = await this.getAccountModel();
		const account = await model
			.findOne({ _id: userId })
			.select("-password -refreshToken");
		return account;
	}

	private async getAccountModel() {
		if (!this.accountModel) {
			const db = await DbConfig.connectDb();
			this.accountModel = db.model("account", AccountSchema);
		}
		return this.accountModel;
	}

	public async register(username: string, password: string): Promise<string> {
		const model = await this.getAccountModel();
		const hashPassword = await hash(password, 10);

		const user = await model.create({
			_id: new mongoose.Types.ObjectId(),
			username,
			password: hashPassword,
		});
		await user.save();
		return "Register successfully";
	}

	public async login(username: string, password: string): Promise<string> {
		const account = await this.getAccountByName(username);
		if (!account) {
			return "username or password invalid";
		}
		const check = await compare(password, account.password);
		if (!check) {
			return "username or password invalid";
		}
		const accessToken = sign(
			{ _id: account._id, username },
			process.env.SECRET_KEY,
			{ algorithm: "HS256", expiresIn: "5h" }
		);
		return accessToken;
	}

	public verifyToken(token: string): JwtPayload | string {
		const decoded = verify(token, process.env.SECRET_KEY);
		return decoded;
	}

	private async getAccountByName(username: string): Promise<Account> {
		const model = await this.getAccountModel();
		const account = await model.findOne({ username });
		return account;
	}
}
