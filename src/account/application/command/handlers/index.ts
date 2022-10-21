import { ChangePasswordHandler } from "./change-password.handler";
import { LoginHandler } from "./login.handler";
import { RegisterHandler } from "./register.handler";
import { UpdateHandler } from "./update.handler";

export const AccountCommandHandler = [
	RegisterHandler,
	LoginHandler,
	ChangePasswordHandler,
	UpdateHandler,
];
