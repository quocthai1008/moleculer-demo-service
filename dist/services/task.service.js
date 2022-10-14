"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_1 = require("moleculer");
const mongoose_1 = require("mongoose");
const task_controller_1 = require("../src/task/task.controller");
class TaskService extends moleculer_1.Service {
    constructor(broker) {
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
            dependencies: ["app"],
        });
    }
    async create(ctx) {
        const { name, detail } = ctx.params;
        const { _id } = ctx.meta.user;
        const res = await task_controller_1.TaskController.create(name, detail, new mongoose_1.default.Types.ObjectId(_id));
        return res;
    }
    async update(ctx) {
        const { taskId, name, detail } = ctx.params;
        const res = await task_controller_1.TaskController.update(new mongoose_1.default.Types.ObjectId(taskId), name, detail);
        return res;
    }
    async delete(ctx) {
        const { taskId } = ctx.params;
        const res = await task_controller_1.TaskController.delete(new mongoose_1.default.Types.ObjectId(taskId));
        this.broker.emit("task.delete", ctx.params);
        return res;
    }
    async findAll(ctx) {
        const { pageId, pageSize } = ctx.params;
        const { _id } = ctx.meta.user;
        const res = await task_controller_1.TaskController.findAll(new mongoose_1.default.Types.ObjectId(_id), pageId, pageSize);
        return res;
    }
    async findOne(ctx) {
        const { taskId } = ctx.params;
        const res = await task_controller_1.TaskController.findOne(new mongoose_1.default.Types.ObjectId(taskId));
        return res;
    }
    async isManger(ctx) {
        const { taskId } = ctx.params;
        const { _id } = ctx.meta.user;
        const res = await task_controller_1.TaskController.isManager(new mongoose_1.default.Types.ObjectId(taskId), new mongoose_1.default.Types.ObjectId(_id));
        if (!res) {
            throw new Error("You not alow to do this");
        }
    }
    async checkTaskExist(ctx) {
        const { taskId } = ctx.params;
        const res = await task_controller_1.TaskController.checkTaskExist(new mongoose_1.default.Types.ObjectId(taskId));
        return res;
    }
    checkPageParams(ctx) {
        const { pageId, pageSize } = ctx.params;
        if (pageId > pageSize || pageId <= 0) {
            throw Error("pageId invalid");
        }
    }
    async checkTaskExistHook(ctx) {
        const res = await this.checkTaskExist(ctx);
        if (!res) {
            throw Error("Task not found");
        }
    }
}
exports.default = TaskService;
//# sourceMappingURL=task.service.js.map