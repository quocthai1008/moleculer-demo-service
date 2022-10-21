import { Service, ServiceBroker } from "moleculer";
import mongoose from "mongoose";
import { LoginDto } from "./src/account/interface/dto/login.dto";

import { RegisterDto } from "./src/account/interface/dto/register.dto";
import { NestFactory } from "@nestjs/core";
import { AccountModule } from "./src/account/account.module";
import { AccountProvider } from "./src/account/interface/account.provider";

class AccountService extends Service {
	private appService: AccountProvider;
	constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "account",

			actions: {
				register: {
					description: "Đăng ký",
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
					description: "Đăng nhập",
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
					description: "Cập nhật tên, địa chỉ",
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
					description: "Đổi mật khẩu",
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
					description: "Xem thông tin người dùng đang đăng nhập",
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
		console.log("thsdsd", this.appService);
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
		const app = await NestFactory.createApplicationContext(AccountModule);
		this.appService = app.get(AccountProvider);
	}
}

export default AccountService;
