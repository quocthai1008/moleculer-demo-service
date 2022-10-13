"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHandler = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const db_config_1 = require("../../config/db.config");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("../../schemas/task.schema");
let TaskHandler = class TaskHandler {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async getTaskModel() {
        if (!this.taskModel) {
            const db = await db_config_1.DbConfig.connectDb();
            this.taskModel = db.model("task", task_schema_1.TaskSchema);
        }
        return this.taskModel;
    }
    async create(name, detail, managerId) {
        const model = await this.getTaskModel();
        const task = await model.create({
            _id: new mongoose_2.default.Types.ObjectId(),
            name,
            detail,
            managerId,
        });
        await task.save();
        return "Create task successfully";
    }
    async update(taskId, name, detail) {
        const model = await this.getTaskModel();
        const task = await model.updateOne({
            _id: taskId,
        }, { name, detail });
        return task.matchedCount !== 0
            ? "Update task successfully"
            : "_id not match";
    }
    async delete(taskId) {
        const model = await this.getTaskModel();
        await model.deleteOne({
            _id: taskId,
        });
        return "Delete task successfully";
    }
    async findAll(managerId, pageId, pageSize) {
        const model = await this.getTaskModel();
        const taskAmount = await model.countDocuments({ managerId });
        const totalPage = Math.ceil(taskAmount / pageSize);
        const tasks = 0 < pageId && pageId <= totalPage
            ? await model
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
    async findOne(taskId) {
        const model = await this.getTaskModel();
        const task = await model.findById(taskId);
        return task;
    }
    async isManager(taskId, managerId) {
        const model = await this.getTaskModel();
        const task = await model.findOne({ _id: taskId, managerId });
        return task ? true : false;
    }
};
TaskHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], TaskHandler);
exports.TaskHandler = TaskHandler;
//# sourceMappingURL=task.handler.js.map