import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type TaskManagerDocument = TaskManager & Document;

export enum TaskStatus {
	NotDone = "Not Done",
	Done = "Done",
}

@Schema({ timestamps: true })
export class TaskManager {
	@Prop({ required: true })
	_id: mongoose.Types.ObjectId;

	@Prop({ required: true })
	userId: mongoose.Types.ObjectId;

	@Prop({ required: true })
	taskId: mongoose.Types.ObjectId;

	@Prop({ enum: TaskStatus, default: TaskStatus.NotDone })
	status: string;
}

export const TaskManagerSchema = SchemaFactory.createForClass(TaskManager);
