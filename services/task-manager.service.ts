import { Service, ServiceBroker } from "moleculer";
import mongoose from "mongoose";
import { TaskManagerController } from "src/task-manager/task-manager.controller";

class TaskManagerService extends Service {
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
						status: "string",
						pageId: "string",
						pageSize: "string",
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
			dependencies: ["app"],
		});
	}

	private async assign(ctx: any) {
		const { taskId, userId } = ctx.params;
		const res = await TaskManagerController.assign(
			new mongoose.Types.ObjectId(taskId),
			new mongoose.Types.ObjectId(userId)
		);
		return res;
	}

	private async remove(ctx: any) {
		const { taskManagerId } = ctx.params;
		const res = await TaskManagerController.remove(
			new mongoose.Types.ObjectId(taskManagerId)
		);
		return res;
	}

	private async taskList(ctx: any) {
		const { userId, status, pageId, pageSize } = ctx.params;
		const res = await TaskManagerController.taskList(
			userId,
			status,
			pageId,
			pageSize
		);
		return res;
	}

	private async markDone(ctx: any) {
		const { taskManagerId } = ctx.params;
		const res = await TaskManagerController.markDone(taskManagerId);
		return res;
	}

	private async assignHook(ctx: any) {
		const condition1 = await ctx.call("account.checkAccountExist", ctx);
		const condition2 = await ctx.call("task.checkTaskExist", ctx);
		if (!condition1 || !condition2) {
			throw new Error("Account or Task not found");
		}
	}

	private async checkTaskManagerExist(ctx: any) {
		const { taskManagerId } = ctx.params;
		const res = await TaskManagerController.checkTaskManagerExist(
			new mongoose.Types.ObjectId(taskManagerId)
		);
		if (!res) {
			throw new Error("Task not found");
		}
	}

	private async checkTaskOwner(ctx: any) {
		const { taskManagerId } = ctx.params;
		const { _id } = ctx.meta.user;
		const res = await TaskManagerController.checkTaskOwner(
			new mongoose.Types.ObjectId(taskManagerId),
			new mongoose.Types.ObjectId(_id)
		);
		if (!res) {
			throw new Error("You not alow to do this");
		}
	}
}

export default TaskManagerService;
