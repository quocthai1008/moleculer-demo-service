import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskManager } from "../../schemas/task-mananger.schema";
import { TaskSchema } from "../../schemas/task.schema";
import { TaskManagerController } from "./task-manager.controller";
import { TaskManagerHandler } from "./task-manager.handler";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskManager.name, schema: TaskSchema },
		]),
	],
	controllers: [TaskManagerController],
	providers: [TaskManagerHandler],
})
export class TaskManagerModule {}
