"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_1 = require("moleculer");
const mongoose_1 = require("mongoose");
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
            started: this.started,
            dependencies: ["app"],
        });
    }
    async assign(ctx) {
        const { taskId, userId } = ctx.params;
        const res = await this.appService.assign(new mongoose_1.default.Types.ObjectId(taskId), new mongoose_1.default.Types.ObjectId(userId));
        return res;
    }
    async remove(ctx) {
        const { taskManagerId } = ctx.params;
        const res = await this.appService.remove(new mongoose_1.default.Types.ObjectId(taskManagerId));
        return res;
    }
    async taskList(ctx) {
        const { userId, status, pageId, pageSize } = ctx.params;
        const res = await this.appService.taskList(new mongoose_1.default.Types.ObjectId(userId), status, pageId, pageSize);
        return res;
    }
    async markDone(ctx) {
        const { taskManagerId } = ctx.params;
        const res = await this.appService.markDone(new mongoose_1.default.Types.ObjectId(taskManagerId));
        return res;
    }
    async assignHook(ctx) {
        const condition1 = await ctx.call("account.checkAccountExist", ctx.params);
        const condition2 = await ctx.call("task.checkTaskExist", ctx.params);
        const condition3 = await this.appService.checkAssignTaskExist(new mongoose_1.default.Types.ObjectId(ctx.params.taskId), new mongoose_1.default.Types.ObjectId(ctx.params.userId));
        if (!condition1 || !condition2) {
            throw new Error("Account or Task not found");
        }
        if (!condition3) {
            throw new Error("Assign task exist");
        }
    }
    async checkTaskManagerExist(ctx) {
        const { taskManagerId } = ctx.params;
        const res = await this.appService.checkTaskManagerExist(new mongoose_1.default.Types.ObjectId(taskManagerId));
        if (!res) {
            throw new Error("Task not found");
        }
    }
    async checkTaskOwner(ctx) {
        const { taskManagerId } = ctx.params;
        const { _id } = ctx.meta.user;
        const res = await this.appService.checkTaskOwner(new mongoose_1.default.Types.ObjectId(taskManagerId), new mongoose_1.default.Types.ObjectId(_id));
        if (!res) {
            throw new Error("You not alow to do this");
        }
    }
    handleTaskDelete(ctx) {
        const { taskId } = ctx.params;
        this.appService.removeByTaskId(new mongoose_1.default.Types.ObjectId(taskId));
    }
    async started() {
        this.appService = await this.broker.call("app.getAppService", {
            service: "task-manager",
        });
    }
}
exports.default = TaskManagerService;
//# sourceMappingURL=task-manager.service.js.map