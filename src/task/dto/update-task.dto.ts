import mongoose from "mongoose";

export class UpdateTaskDto {
	taskId: mongoose.Types.ObjectId;
	name: string;
	detail: string;
}
