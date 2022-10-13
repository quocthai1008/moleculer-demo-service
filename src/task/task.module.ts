import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "../../schemas/task.schema";
import { TaskController } from "./task.controller";
import { TaskHandler } from "./task.handler";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
	],
	controllers: [TaskController],
	providers: [TaskHandler],
})
export class TaskModule {}
