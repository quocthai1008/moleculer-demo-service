import mongoose from "mongoose";
import { Task } from "../schemas/task.schema";
import { Pagination } from "../interfaces/pagination.interface";

export interface TaskRepository {
	create(
		name: string,
		detail: string,
		managerId: mongoose.Types.ObjectId
	): Promise<string>;

	update(
		taskId: mongoose.Types.ObjectId,
		name: string,
		detail: string
	): Promise<string>;

	delete(taskId: mongoose.Types.ObjectId): Promise<string>;

	findAll(
		managerId: mongoose.Types.ObjectId,
		pageId: number,
		pageSize: number
	): Promise<Pagination<Task>>;

	findOne(taskId: mongoose.Types.ObjectId): Promise<Task>;

	isManager(
		taskId: mongoose.Types.ObjectId,
		managerId: mongoose.Types.ObjectId
	): Promise<boolean>;

	checkTaskExist(taskId: mongoose.Types.ObjectId): Promise<boolean>;
}
