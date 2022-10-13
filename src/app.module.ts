import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AccountModule } from "./account/account.module";
import { TaskModule } from "./task/task.module";
import { TaskManagerModule } from "./task-manager/task-manager.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.CONNECTION_STRING),
		AccountModule,
		TaskModule,
		TaskManagerModule,
	],
})
export class AppModule {}
