import mongoose from "mongoose";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskManager } from "../schemas/task-manager.schema";

export interface TaskManagerRepository {
	assign(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<string>;

	remove(taskManagerId: mongoose.Types.ObjectId): Promise<string>;

	taskList(
		userId: mongoose.Types.ObjectId,
		status: number,
		pageId: number,
		pageSize: number
	): Promise<Pagination<TaskManager>>;

	markDone(taskMangerId: mongoose.Types.ObjectId): Promise<string>;

	checkTaskManagerExist(
		taskMangerId: mongoose.Types.ObjectId
	): Promise<boolean>;

	checkTaskOwner(
		taskMangerId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean>;

	removeByTaskId(taskId: mongoose.Types.ObjectId): Promise<void>;
}
