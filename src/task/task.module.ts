import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "../schemas/task.schema";
import { TaskHandler } from "./task.handler";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.CONNECTION_STRING),
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
	],
	providers: [TaskHandler],
})
export class TaskModule {}
