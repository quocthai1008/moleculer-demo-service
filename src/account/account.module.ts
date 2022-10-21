import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "./infrastructure/model/account.model";
import { AccountProvider } from "./interface/account.provider";
import { AccountRepositoryImpl } from "./infrastructure/repositories/user.repository";
import { AccountCommandHandler } from "./application/command/handlers";
import { CqrsModule } from "@nestjs/cqrs";
import { AccountQueryHandler } from "./application/query/handler";

@Module({
	imports: [
		CqrsModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.CONNECTION_STRING),
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
	],
	providers: [
		AccountRepositoryImpl,
		...AccountCommandHandler,
		...AccountQueryHandler,
	],
	controllers: [AccountProvider],
})
export class AccountModule {}
