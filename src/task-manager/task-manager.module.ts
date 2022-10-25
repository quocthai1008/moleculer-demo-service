import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskManager, TaskManagerSchema } from "../schemas/task-manager.schema";
import { TaskManagerHandler } from "./task-manager.handler";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.CONNECTION_STRING),
		MongooseModule.forFeature([
			{ name: TaskManager.name, schema: TaskManagerSchema },
		]),
	],
	providers: [TaskManagerHandler],
})
export class TaskManagerModule {}
