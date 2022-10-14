import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
	TaskManager,
	TaskManagerSchema,
} from "../schemas/task-mananger.schema";
import { TaskManagerHandler } from "./task-manager.handler";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskManager.name, schema: TaskManagerSchema },
		]),
	],
	providers: [TaskManagerHandler],
})
export class TaskManagerModule {}
