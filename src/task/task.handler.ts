import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Task } from "../schemas/task.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskRepository } from "./task.repository";

@Injectable()
export class TaskHandler implements TaskRepository {
	constructor(
		@InjectModel(Task.name)
		private taskModel: mongoose.Model<Task>
	) {}

	public async checkTaskExist(
		taskId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const check = await this.taskModel
			.findOne({ _id: taskId })
			.select("_id")
			.lean();
		return check ? true : false;
	}

	public async create(
		name: string,
		detail: string,
		managerId: mongoose.Types.ObjectId
	): Promise<string> {
		const task = await this.taskModel.create({
			_id: new mongoose.Types.ObjectId(),
			name,
			detail,
			managerId,
		});
		await task.save();
		return "Create task successfully";
	}

	public async update(
		taskId: mongoose.Types.ObjectId,
		name: string,
		detail: string
	): Promise<string> {
		const task = await this.taskModel.updateOne(
			{
				_id: taskId,
			},
			{ name, detail }
		);
		return task.matchedCount !== 0
			? "Update task successfully"
			: "_id not match";
	}

	public async delete(taskId: mongoose.Types.ObjectId): Promise<string> {
		await this.taskModel.deleteOne({
			_id: taskId,
		});
		return "Delete task successfully";
	}

	public async findAll(
		managerId: mongoose.Types.ObjectId,
		pageId: number,
		pageSize: number
	): Promise<Pagination<Task>> {
		const taskAmount: number = await this.taskModel.countDocuments({
			managerId,
		});

		const totalPage: number = Math.ceil(taskAmount / pageSize);

		const tasks =
			0 < pageId && pageId <= totalPage
				? await this.taskModel
						.find({ managerId })
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

	public async findOne(taskId: mongoose.Types.ObjectId): Promise<Task> {
		const task = await this.taskModel.findById(taskId);
		return task;
	}

	public async isManager(
		taskId: mongoose.Types.ObjectId,
		managerId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const task = await this.taskModel.findOne({ _id: taskId, managerId });
		return task ? true : false;
	}
}
