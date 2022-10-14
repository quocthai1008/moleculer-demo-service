import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
	TaskManager,
	TaskManagerSchema,
} from "../../schemas/task-mananger.schema";
import { TaskManagerController } from "./task-manager.controller";
import { TaskManagerHandler } from "./task-manager.handler";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskManager.name, schema: TaskManagerSchema },
		]),
	],
	controllers: [TaskManagerController],
	providers: [TaskManagerHandler],
})
export class TaskManagerModule {}
