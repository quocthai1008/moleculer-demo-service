import { Service, ServiceBroker } from "moleculer";
import mongoose from "mongoose";
import { TaskHandler } from "../task/task.handler";
import { CreateTaskDto } from "../task/dto/create-task.dto";
import { DeleteTaskDto } from "../task/dto/delete-task.dto";
import { FindAllTaskDto } from "../task/dto/find-all-task.dto";
import { FindOneTaskDto } from "../task/dto/find-one-task.dto";
import { UpdateTaskDto } from "../task/dto/update-task.dto";
import { NestFactory } from "@nestjs/core";
import { TaskModule } from "../task/task.module";

class TaskService extends Service {
	private appService: TaskHandler;

	constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "task",

			hooks: {
				before: {
					update: [this.checkTaskExistHook, this.isManger],
					delete: [this.checkTaskExistHook, this.isManger],
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
			started: this.started,
		});
	}

	private async create(ctx: any) {
		const { name, detail }: CreateTaskDto = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await this.appService.create(
			name,
			detail,
			new mongoose.Types.ObjectId(_id)
		);
		return res;
	}

	private async update(ctx: any) {
		const { taskId, name, detail }: UpdateTaskDto = ctx.params;
		const res = await this.appService.update(
			new mongoose.Types.ObjectId(taskId),
			name,
			detail
		);
		return res;
	}

	private async delete(ctx: any) {
		const { taskId }: DeleteTaskDto = ctx.params;
		const res = await this.appService.delete(
			new mongoose.Types.ObjectId(taskId)
		);
		this.broker.emit("task.delete", ctx.params);
		return res;
	}

	private async findAll(ctx: any) {
		const { pageId, pageSize }: FindAllTaskDto = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await this.appService.findAll(
			new mongoose.Types.ObjectId(_id),
			pageId,
			pageSize
		);
		return res;
	}

	private async findOne(ctx: any) {
		const { taskId }: FindOneTaskDto = ctx.params;
		const res = await this.appService.findOne(
			new mongoose.Types.ObjectId(taskId)
		);
		return res;
	}

	private async isManger(ctx: any): Promise<void> {
		const { taskId } = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await this.appService.isManager(
			new mongoose.Types.ObjectId(taskId),
			new mongoose.Types.ObjectId(_id)
		);
		if (!res) {
			throw new Error("You not alow to do this");
		}
	}

	private async checkTaskExist(ctx: any) {
		const { taskId } = ctx.params;
		const res = await this.appService.checkTaskExist(
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
		const res = await this.checkTaskExist(ctx);
		if (!res) {
			throw Error("Task not found");
		}
	}

	async started() {
		const app = await NestFactory.createApplicationContext(TaskModule);
		this.appService = app.get(TaskHandler);
	}
}

export default TaskService;
