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
exports.TaskManagerHandler = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_mananger_schema_1 = require("../schemas/task-mananger.schema");
let TaskManagerHandler = class TaskManagerHandler {
    constructor(taskManagerModel) {
        this.taskManagerModel = taskManagerModel;
    }
    async removeByTaskId(taskId) {
        await this.taskManagerModel.deleteMany({ taskId });
    }
    async checkTaskManagerExist(taskMangerId) {
        const check = await this.taskManagerModel
            .findOne({ _id: taskMangerId })
            .select("_id")
            .lean();
        return check ? true : false;
    }
    async checkTaskOwner(taskMangerId, userId) {
        const check = await this.taskManagerModel
            .findOne({ _id: taskMangerId, userId })
            .select("_id")
            .lean();
        return check ? true : false;
    }
    async assign(taskId, userId) {
        const task = await this.taskManagerModel.create({
            _id: new mongoose_2.default.Types.ObjectId(),
            taskId,
            userId,
        });
        await task.save();
        return "Assign task successfully";
    }
    async remove(taskManagerId) {
        await this.taskManagerModel.deleteOne({
            _id: taskManagerId,
        });
        return "Remove task successfully";
    }
    async taskList(userId, status, pageId, pageSize) {
        const queryObject = status === 0
            ? { userId, status: task_mananger_schema_1.TaskStatus.NotDone }
            : status === 1
                ? { userId, status: task_mananger_schema_1.TaskStatus.Done }
                : { userId };
        const taskAmount = await this.taskManagerModel.countDocuments(queryObject);
        const totalPage = Math.ceil(taskAmount / pageSize);
        const tasks = 0 < pageId && pageId <= totalPage
            ? await this.taskManagerModel
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
    async markDone(taskMangerId) {
        const task = await this.taskManagerModel.updateOne({
            _id: taskMangerId,
        }, { status: task_mananger_schema_1.TaskStatus.Done });
        return task.matchedCount !== 0
            ? "Mark done successfully"
            : "_id not match";
    }
};
TaskManagerHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_mananger_schema_1.TaskManager.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], TaskManagerHandler);
exports.TaskManagerHandler = TaskManagerHandler;
//# sourceMappingURL=task-manager.handler.js.map