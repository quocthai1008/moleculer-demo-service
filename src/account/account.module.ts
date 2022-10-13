import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "../../schemas/account.schema";
import { AccountController } from "./account.controller";
import { AccountHandler } from "./account.handler";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
	],
	controllers: [AccountController],
	providers: [AccountHandler],
})
export class AccountModule {}
