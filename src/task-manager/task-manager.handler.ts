import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TaskManager, TaskStatus } from "../schemas/task-manager.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskManagerRepository } from "./task-manager.repository";

@Injectable()
export class TaskManagerHandler implements TaskManagerRepository {
	constructor(
		@InjectModel(TaskManager.name)
		private taskManagerModel: mongoose.Model<TaskManager>
	) {}

	public async checkAssignTaskExist(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const check = await this.taskManagerModel
			.findOne({ userId, taskId })
			.select("_id")
			.lean();
		return check ? false : true;
	}

	public async removeByTaskId(
		taskId: mongoose.Types.ObjectId
	): Promise<void> {
		await this.taskManagerModel.deleteMany({ taskId });
	}

	public async checkTaskManagerExist(
		taskMangerId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const check = await this.taskManagerModel
			.findOne({ _id: taskMangerId })
			.select("_id")
			.lean();
		return check ? true : false;
	}

	public async checkTaskOwner(
		taskMangerId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const check = await this.taskManagerModel
			.findOne({ _id: taskMangerId, userId })
			.select("_id")
			.lean();
		return check ? true : false;
	}

	public async assign(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<string> {
		const task = await this.taskManagerModel.create({
			_id: new mongoose.Types.ObjectId(),
			taskId,
			userId,
		});
		await task.save();
		return "Assign task successfully";
	}

	public async remove(
		taskManagerId: mongoose.Types.ObjectId
	): Promise<string> {
		await this.taskManagerModel.deleteOne({
			_id: taskManagerId,
		});
		return "Remove task successfully";
	}

	public async taskList(
		userId: mongoose.Types.ObjectId,
		status: number,
		pageId: number,
		pageSize: number
	): Promise<Pagination<TaskManager>> {
		const queryObject =
			status === 0
				? { userId, status: TaskStatus.NotDone }
				: status === 1
				? { userId, status: TaskStatus.Done }
				: { userId };
		const taskAmount: number = await this.taskManagerModel.countDocuments(
			queryObject
		);

		const totalPage: number = Math.ceil(taskAmount / pageSize);

		const tasks =
			0 < pageId && pageId <= totalPage
				? await this.taskManagerModel
						.find(queryObject)
						.lean()
						.sort({ createdAt: -1 })
						.skip(pageSize * (pageId - 1))
						.limit(pageSize)
				: [];

		return {
			data: tasks,
			pagination: {
				totalPage,
				pageSize,
				pageId,
			},
		};
	}

	public async markDone(
		taskMangerId: mongoose.Types.ObjectId
	): Promise<string> {
		const task = await this.taskManagerModel.updateOne(
			{
				_id: taskMangerId,
			},
			{ status: TaskStatus.Done }
		);
		return task.matchedCount !== 0
			? "Mark done successfully"
			: "_id not match";
	}
}
