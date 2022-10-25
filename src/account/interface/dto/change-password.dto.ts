import { IsNotEmpty, MinLength } from "class-validator";

export class ChangePasswordDto {
	@IsNotEmpty({ message: "UserId required" })
	userId: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	oldPassword: string;

	@IsNotEmpty()
	@MinLength(6, {
		message: "Password must have at least 6 character",
	})
	newPassword: string;
}
