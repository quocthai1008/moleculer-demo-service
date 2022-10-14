"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_1 = require("moleculer");
const mongoose_1 = require("mongoose");
const task_manager_controller_1 = require("../src/task-manager/task-manager.controller");
class TaskManagerService extends moleculer_1.Service {
    constructor(broker) {
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
            dependencies: ["app"],
        });
    }
    async assign(ctx) {
        const { taskId, userId } = ctx.params;
        const res = await task_manager_controller_1.TaskManagerController.assign(new mongoose_1.default.Types.ObjectId(taskId), new mongoose_1.default.Types.ObjectId(userId));
        return res;
    }
    async remove(ctx) {
        const { taskManagerId } = ctx.params;
        const res = await task_manager_controller_1.TaskManagerController.remove(new mongoose_1.default.Types.ObjectId(taskManagerId));
        return res;
    }
    async taskList(ctx) {
        const { userId, status, pageId, pageSize } = ctx.params;
        const res = await task_manager_controller_1.TaskManagerController.taskList(new mongoose_1.default.Types.ObjectId(userId), status, pageId, pageSize);
        return res;
    }
    async markDone(ctx) {
        const { taskManagerId } = ctx.params;
        const res = await task_manager_controller_1.TaskManagerController.markDone(new mongoose_1.default.Types.ObjectId(taskManagerId));
        return res;
    }
    async assignHook(ctx) {
        const condition1 = await ctx.call("account.checkAccountExist", ctx.params);
        const condition2 = await ctx.call("task.checkTaskExist", ctx.params);
        if (!condition1 || !condition2) {
            throw new Error("Account or Task not found");
        }
    }
    async checkTaskManagerExist(ctx) {
        const { taskManagerId } = ctx.params;
        const res = await task_manager_controller_1.TaskManagerController.checkTaskManagerExist(new mongoose_1.default.Types.ObjectId(taskManagerId));
        if (!res) {
            throw new Error("Task not found");
        }
    }
    async checkTaskOwner(ctx) {
        const { taskManagerId } = ctx.params;
        const { _id } = ctx.meta.user;
        const res = await task_manager_controller_1.TaskManagerController.checkTaskOwner(new mongoose_1.default.Types.ObjectId(taskManagerId), new mongoose_1.default.Types.ObjectId(_id));
        if (!res) {
            throw new Error("You not alow to do this");
        }
    }
    handleTaskDelete(ctx) {
        const { taskId } = ctx.params;
        console.log("ok");
        task_manager_controller_1.TaskManagerController.removeByTaskId(new mongoose_1.default.Types.ObjectId(taskId));
    }
}
exports.default = TaskManagerService;
//# sourceMappingURL=task-manager.service.js.map