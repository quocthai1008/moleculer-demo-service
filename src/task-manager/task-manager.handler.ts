import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DbConfig } from "../../config/db.config";
import mongoose from "mongoose";
import {
	TaskManager,
	TaskManagerSchema,
	TaskStatus,
} from "../../schemas/task-mananger.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskManagerRepository } from "./task-manager.repository";

@Injectable()
export class TaskManagerHandler implements TaskManagerRepository {
	constructor(
		@InjectModel(TaskManager.name)
		private taskManagerModel: mongoose.Model<TaskManager>
	) {}

	public async removeByTaskId(
		taskId: mongoose.Types.ObjectId
	): Promise<void> {
		const model = await this.getTaskManagerModel();
		await model.deleteMany({ taskId });
	}

	public async checkTaskManagerExist(
		taskMangerId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const model = await this.getTaskManagerModel();
		const check = await model
			.findOne({ _id: taskMangerId })
			.select("_id")
			.lean();
		return check ? true : false;
	}

	public async checkTaskOwner(
		taskMangerId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const model = await this.getTaskManagerModel();
		const check = await model
			.findOne({ _id: taskMangerId, userId })
			.select("_id")
			.lean();
		return check ? true : false;
	}

	public async assign(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<string> {
		const model = await this.getTaskManagerModel();
		const task = await model.create({
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
		const model = await this.getTaskManagerModel();
		await model.deleteOne({
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
		const model = await this.getTaskManagerModel();

		const queryObject =
			status === 0
				? { userId, status: TaskStatus.NotDone }
				: status === 1
				? { userId, status: TaskStatus.Done }
				: { userId };
		const taskAmount: number = await model.countDocuments(queryObject);

		const totalPage: number = Math.ceil(taskAmount / pageSize);

		const tasks =
			0 < pageId && pageId <= totalPage
				? await model
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
		const model = await this.getTaskManagerModel();
		const task = await model.updateOne(
			{
				_id: taskMangerId,
			},
			{ status: TaskStatus.Done }
		);
		return task.matchedCount !== 0
			? "Mark done successfully"
			: "_id not match";
	}

	private async getTaskManagerModel() {
		if (!this.taskManagerModel) {
			const db = await DbConfig.connectDb();
			this.taskManagerModel = db.model("task-manager", TaskManagerSchema);
		}
		return this.taskManagerModel;
	}
}
