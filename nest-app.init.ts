import { NestFactory } from "@nestjs/core";
import { AccountModule } from "./src/account/application/account.module";
import { AccountController } from "./src/account/application/account.controller";

export const initNestJsApp = async () => {
	const app = await NestFactory.createApplicationContext(AccountModule);
	return app.get(AccountController);
};
