import { Service, ServiceBroker } from "moleculer";
import mongoose from "mongoose";
import { LoginDto } from "../src/account/dto/login.dto";

import { RegisterDto } from "../src/account/dto/register.dto";
import { AccountHandler } from "../src/account/account.handler";

class AccountService extends Service {
	private appService: AccountHandler;
	constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "account",

			actions: {
				register: {
					rest: {
						method: "POST",
						path: "/register",
					},
					params: {
						username: "string",
						password: { type: "string", min: 6 },
					},
					handler: this.register,
				},
				login: {
					rest: {
						method: "POST",
						path: "/login",
					},
					params: {
						username: "string",
						password: "string",
					},
					handler: this.login,
				},
				update: {
					rest: {
						method: "PUT",
						path: "/update",
					},
					params: {
						fullName: "string",
						address: "string",
					},
					handler: this.update,
				},
				changePassword: {
					rest: {
						method: "PUT",
						path: "/changePassword",
					},
					params: {
						oldPassword: "string",
						newPassword: { type: "string", min: 6 },
					},
					handler: this.changePassword,
				},
				getInfo: {
					rest: {
						method: "GET",
						path: "/getInfo",
					},
					handler: this.getInfo,
				},
				verifyToken: {
					handler: this.verifyToken,
				},
				checkAccountExist: {
					handler: this.checkAccountExist,
				},
			},
			started: this.started,
			dependencies: ["app"],
		});
	}

	private async register(ctx: any) {
		const { username, password }: RegisterDto = ctx.params;
		const res = await this.appService.register(username, password);
		return res;
	}

	private async login(ctx: any) {
		const { username, password }: LoginDto = ctx.params;
		const res = await this.appService.login(username, password);
		return res;
	}

	private async update(ctx: any) {
		const { _id } = ctx.meta.user;
		const { fullName, address } = ctx.params;
		const res = await this.appService.update(
			new mongoose.Types.ObjectId(_id),
			fullName,
			address
		);
		return res;
	}

	private async verifyToken(ctx: any) {
		const { token } = ctx.params;
		const res = this.appService.verifyToken(token);
		return res;
	}

	private async changePassword(ctx: any) {
		const { oldPassword, newPassword } = ctx.params;
		const { _id, username } = ctx.meta.user;
		const res = await this.appService.changePassword(
			new mongoose.Types.ObjectId(_id),
			username,
			oldPassword,
			newPassword
		);
		return res;
	}

	private async getInfo(ctx: any) {
		const { _id } = ctx.meta.user;
		const res = this.appService.getAccountById(
			new mongoose.Types.ObjectId(_id)
		);
		return res;
	}

	private async checkAccountExist(ctx: any) {
		const { userId } = ctx.params;
		const res = await this.appService.checkAccountExist(
			new mongoose.Types.ObjectId(userId)
		);
		return res;
	}

	async started() {
		this.appService = await this.broker.call("app.getAppService", {
			service: "account",
		});
	}
}

export default AccountService;
