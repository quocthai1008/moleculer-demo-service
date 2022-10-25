import { IsNotEmpty, Length } from "class-validator";

export class LoginDto {
	@IsNotEmpty({ message: "Username is required" })
	@Length(5, 5)
	username: string;
	
	password: string;
}
