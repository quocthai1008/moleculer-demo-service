import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "../schemas/account.schema";
import { AccountHandler } from "./account.handler";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
	],
	providers: [AccountHandler],
})
export class AccountModule {}
