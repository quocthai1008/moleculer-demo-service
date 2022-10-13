import { Service, ServiceBroker } from "moleculer";
import mongoose from "mongoose";
import { CreateTaskDto } from "../src/task/dto/create-task.dto";
import { DeleteTaskDto } from "../src/task/dto/delete-task.dto";
import { FindAllTaskDto } from "../src/task/dto/find-all-task.dto";
import { FindOneTaskDto } from "../src/task/dto/find-one-task.dto";
import { UpdateTaskDto } from "../src/task/dto/update-task.dto";
import { TaskController } from "../src/task/task.controller";

class TaskService extends Service {
	constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "task",

			hooks: {
				before: {
					update: [this.isManger, this.checkTaskExistHook],
					delete: [this.isManger, this.checkTaskExistHook],
					findAll: [this.checkPageParams],
				},
			},

			actions: {
				create: {
					rest: {
						method: "POST",
						path: "/create",
					},
					params: {
						name: "string",
						detail: "string",
					},
					handler: this.create,
				},
				update: {
					rest: {
						method: "PUT",
						path: "/update",
					},
					params: {
						taskId: "string",
						name: "string",
						detail: "string",
					},
					handler: this.update,
				},
				delete: {
					rest: {
						method: "DELETE",
						path: "/delete",
					},
					params: {
						taskId: "string",
					},
					handler: this.delete,
				},
				findAll: {
					rest: {
						method: "GET",
						path: "/findAll",
					},
					params: {
						pageId: "number",
						pageSize: "number",
					},
					handler: this.findAll,
				},
				findOne: {
					rest: {
						method: "GET",
						path: "/findOne",
					},
					params: {
						taskId: "string",
					},
					handler: this.findOne,
				},
				checkTaskExist: {
					handler: this.checkTaskExist,
				},
			},
			dependencies: ["app"],
		});
	}

	private async create(ctx: any) {
		const { name, detail }: CreateTaskDto = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await TaskController.create(
			name,
			detail,
			new mongoose.Types.ObjectId(_id)
		);
		return res;
	}

	private async update(ctx: any) {
		const { taskId, name, detail }: UpdateTaskDto = ctx.params;
		const res = await TaskController.update(
			new mongoose.Types.ObjectId(taskId),
			name,
			detail
		);
		return res;
	}

	private async delete(ctx: any) {
		const { taskId }: DeleteTaskDto = ctx.params;
		const res = await TaskController.delete(
			new mongoose.Types.ObjectId(taskId)
		);
		return res;
	}

	private async findAll(ctx: any) {
		const { pageId, pageSize }: FindAllTaskDto = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await TaskController.findAll(
			new mongoose.Types.ObjectId(_id),
			pageId,
			pageSize
		);
		return res;
	}

	private async findOne(ctx: any) {
		const { taskId }: FindOneTaskDto = ctx.params;
		const res = await TaskController.findOne(
			new mongoose.Types.ObjectId(taskId)
		);
		return res;
	}

	private async isManger(ctx: any): Promise<void> {
		const { taskId } = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await TaskController.isManager(
			new mongoose.Types.ObjectId(taskId),
			new mongoose.Types.ObjectId(_id)
		);
		if (!res) {
			throw new Error("You not alow to do this");
		}
	}

	private async checkTaskExist(ctx: any) {
		const { taskId } = ctx.params;
		const res = await TaskController.checkTaskExist(
			new mongoose.Types.ObjectId(taskId)
		);
		return res;
	}

	private checkPageParams(ctx: any): void {
		const { pageId, pageSize } = ctx.params;
		if (pageId > pageSize || pageId <= 0) {
			throw Error("pageId invalid");
		}
	}

	private async checkTaskExistHook(ctx: any) {
		const res = this.checkTaskExist(ctx);
		if (!res) {
			throw Error("Task not found");
		}
	}
}

export default TaskService;
