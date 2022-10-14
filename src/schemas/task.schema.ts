import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
	@Prop({ required: true })
	_id: mongoose.Types.ObjectId;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	detail: string;

	@Prop({ required: true })
	managerId: mongoose.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
