import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { Task } from "../../schemas/task.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskHandler } from "./task.handler";

@Controller()
export class TaskController {
	static taskHandler: TaskHandler;

	constructor(taskHandler: TaskHandler) {
		TaskController.taskHandler = taskHandler;
	}

	static create(
		name: string,
		detail: string,
		managerId: mongoose.Types.ObjectId
	): Promise<String> {
		return TaskController.taskHandler.create(name, detail, managerId);
	}

	static update(
		taskId: mongoose.Types.ObjectId,
		name: string,
		detail: string
	): Promise<string> {
		return TaskController.taskHandler.update(taskId, name, detail);
	}

	static delete(taskId: mongoose.Types.ObjectId): Promise<string> {
		return TaskController.taskHandler.delete(taskId);
	}

	static findAll(
		managerId: mongoose.Types.ObjectId,
		pageId: number,
		pageSize: number
	): Promise<Pagination<Task>> {
		return TaskController.taskHandler.findAll(managerId, pageId, pageSize);
	}

	static findOne(taskId: mongoose.Types.ObjectId): Promise<Task> {
		return TaskController.taskHandler.findOne(taskId);
	}

	static isManager(
		taskId: mongoose.Types.ObjectId,
		managerId: mongoose.Types.ObjectId
	): Promise<boolean> {
		return TaskController.taskHandler.isManager(taskId, managerId);
	}

	static checkTaskExist(taskId: mongoose.Types.ObjectId): Promise<boolean> {
		return TaskController.taskHandler.checkTaskExist(taskId);
	}
}
