import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { TaskManager } from "../../schemas/task-mananger.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskManagerHandler } from "./task-manager.handler";

@Controller()
export class TaskManagerController {
	static taskManagerHandler: TaskManagerHandler;

	constructor(taskManagerHandler: TaskManagerHandler) {
		TaskManagerController.taskManagerHandler = taskManagerHandler;
	}

	static assign(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<string> {
		return TaskManagerController.taskManagerHandler.assign(taskId, userId);
	}

	static remove(taskManagerId: mongoose.Types.ObjectId): Promise<string> {
		return TaskManagerController.taskManagerHandler.remove(taskManagerId);
	}

	static taskList(
		userId: mongoose.Types.ObjectId,
		status: number,
		pageId: number,
		pageSize: number
	): Promise<Pagination<TaskManager>> {
		return TaskManagerController.taskManagerHandler.taskList(
			userId,
			status,
			pageId,
			pageSize
		);
	}

	static markDone(taskMangerId: mongoose.Types.ObjectId): Promise<string> {
		return TaskManagerController.taskManagerHandler.markDone(taskMangerId);
	}

	static checkTaskManagerExist(
		taskMangerId: mongoose.Types.ObjectId
	): Promise<boolean> {
		return TaskManagerController.taskManagerHandler.checkTaskManagerExist(
			taskMangerId
		);
	}

	static checkTaskOwner(
		taskMangerId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		return TaskManagerController.taskManagerHandler.checkTaskOwner(
			taskMangerId,
			userId
		);
	}

	static removeByTaskId(taskId: mongoose.Types.ObjectId) {
		TaskManagerController.taskManagerHandler.removeByTaskId(taskId);
	}
}
