import { Context, ServiceSchema } from "moleculer";
import mongoose from "mongoose";
import { AccountController } from "./application/account.controller";
import { LoginDto } from "./interface/dto/login.dto";
import { RegisterDto } from "./interface/dto/register.dto";
import { UpdateDto } from "./interface/dto/update.dto";
import { ChangePasswordDto } from "./interface/dto/change-password.dto";
import { GetInfoDto } from "./interface/dto/get-info.dto";
import { initNestJsApp } from "../../nest-app.init";
import { validate } from "class-validator";

export const AccountServiceSchema = (): ServiceSchema => {
	let accountController: AccountController;

	return {
		name: process.env.SERVICE_NAME,

		created: async () => {
			accountController = await initNestJsApp();
		},

		actions: {
			register: {
				description: "Đăng ký",
				params: {
					username: "string",
					password: { type: "string", min: 6 },
				},
				handler: async (ctx: Context<RegisterDto>) => {
					return await accountController.register(
						ctx.params.username,
						ctx.params.password
					);
				},
			},
			login: {
				description: "Đăng nhập",
				handler: async (ctx: Context<LoginDto>) => {
					const sample: LoginDto = {
						username: "",
						password: "12345",
					};
					const check = await validate(sample);
					console.log(check);
					return await accountController.login(
						ctx.params.username,
						ctx.params.password
					);
				},
			},
			update: {
				description: "Cập nhật tên, địa chỉ",
				params: {
					fullName: "string",
					address: "string",
				},
				handler: async (ctx: Context<UpdateDto>) => {
					return await accountController.update(
						new mongoose.Types.ObjectId(ctx.params.userId),
						ctx.params.fullName,
						ctx.params.address
					);
				},
			},

			changePassword: {
				description: "Đổi mật khẩu",
				params: {
					oldPassword: "string",
					newPassword: { type: "string", min: 6 },
				},
				handler: async (ctx: Context<ChangePasswordDto>) => {
					return await accountController.changePassword(
						new mongoose.Types.ObjectId(ctx.params.userId),
						ctx.params.username,
						ctx.params.oldPassword,
						ctx.params.newPassword
					);
				},
			},
			getInfo: {
				description: "Xem thông tin người dùng đang đăng nhập",
				handler: async (ctx: Context<unknown, GetInfoDto>) => {
					return await accountController.getAccountById(
						new mongoose.Types.ObjectId(ctx.meta.userId)
					);
				},
			},
		},
	};
};
