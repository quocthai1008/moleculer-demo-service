import { NestFactory } from "@nestjs/core";
import { Service, ServiceBroker } from "moleculer";
import mongoose from "mongoose";
import { TaskManagerModule } from "../task-manager/task-manager.module";
import { TaskManagerHandler } from "../task-manager/task-manager.handler";

class TaskManagerService extends Service {
	private appService: TaskManagerHandler;
	constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "task-manager",

			hooks: {
				before: {
					assign: [this.assignHook],
					remove: [this.checkTaskManagerExist],
					markDone: [this.checkTaskManagerExist, this.checkTaskOwner],
				},
			},

			actions: {
				assign: {
					rest: {
						method: "POST",
						path: "/assign",
					},
					params: {
						taskId: "string",
						userId: "string",
					},
					handler: this.assign,
				},
				remove: {
					rest: {
						method: "DELETE",
						path: "/remove",
					},
					params: {
						taskManagerId: "string",
					},
					handler: this.remove,
				},
				taskList: {
					rest: {
						method: "GET",
						path: "/assign",
					},
					params: {
						userId: "string",
						status: "number",
						pageId: "number",
						pageSize: "number",
					},
					handler: this.taskList,
				},
				markDone: {
					rest: {
						method: "PUT",
						path: "/markDone",
					},
					params: {
						taskManagerId: "string",
					},
					handler: this.markDone,
				},
			},
			events: {
				"task.delete": this.handleTaskDelete,
			},
			started: this.started,
		});
	}

	private async assign(ctx: any) {
		const { taskId, userId } = ctx.params;
		const res = await this.appService.assign(
			new mongoose.Types.ObjectId(taskId),
			new mongoose.Types.ObjectId(userId)
		);
		return res;
	}

	private async remove(ctx: any) {
		const { taskManagerId } = ctx.params;
		const res = await this.appService.remove(
			new mongoose.Types.ObjectId(taskManagerId)
		);
		return res;
	}

	private async taskList(ctx: any) {
		const { userId, status, pageId, pageSize } = ctx.params;
		const res = await this.appService.taskList(
			new mongoose.Types.ObjectId(userId),
			status,
			pageId,
			pageSize
		);
		return res;
	}

	private async markDone(ctx: any) {
		const { taskManagerId } = ctx.params;
		const res = await this.appService.markDone(
			new mongoose.Types.ObjectId(taskManagerId)
		);
		return res;
	}

	private async assignHook(ctx: any) {
		const condition1 = await ctx.call(
			"account.checkAccountExist",
			ctx.params
		);
		const condition2 = await ctx.call("task.checkTaskExist", ctx.params);
		const condition3 = await this.appService.checkAssignTaskExist(
			new mongoose.Types.ObjectId(ctx.params.taskId),
			new mongoose.Types.ObjectId(ctx.params.userId)
		);

		if (!condition1 || !condition2) {
			throw new Error("Account or Task not found");
		}

		if (!condition3) {
			throw new Error("Assign task exist");
		}
	}

	private async checkTaskManagerExist(ctx: any) {
		const { taskManagerId } = ctx.params;
		const res = await this.appService.checkTaskManagerExist(
			new mongoose.Types.ObjectId(taskManagerId)
		);
		if (!res) {
			throw new Error("Task not found");
		}
	}

	private async checkTaskOwner(ctx: any) {
		const { taskManagerId } = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await this.appService.checkTaskOwner(
			new mongoose.Types.ObjectId(taskManagerId),
			new mongoose.Types.ObjectId(_id)
		);
		if (!res) {
			throw new Error("You not alow to do this");
		}
	}

	private handleTaskDelete(ctx: any) {
		const { taskId } = ctx.params;
		this.appService.removeByTaskId(new mongoose.Types.ObjectId(taskId));
	}

	async started() {
		const app = await NestFactory.createApplicationContext(
			TaskManagerModule
		);
		this.appService = app.get(TaskManagerHandler);
	}
}

export default TaskManagerService;
