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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagerHandler = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const task_manager_schema_1 = require("../schemas/task-manager.schema");
let TaskManagerHandler = class TaskManagerHandler {
    constructor(taskManagerModel) {
        this.taskManagerModel = taskManagerModel;
    }
    checkAssignTaskExist(taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.taskManagerModel
                .findOne({ userId, taskId })
                .select("_id")
                .lean();
            return check ? false : true;
        });
    }
    removeByTaskId(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskManagerModel.deleteMany({ taskId });
        });
    }
    checkTaskManagerExist(taskMangerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.taskManagerModel
                .findOne({ _id: taskMangerId })
                .select("_id")
                .lean();
            return check ? true : false;
        });
    }
    checkTaskOwner(taskMangerId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.taskManagerModel
                .findOne({ _id: taskMangerId, userId })
                .select("_id")
                .lean();
            return check ? true : false;
        });
    }
    assign(taskId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskManagerModel.create({
                _id: new mongoose_2.default.Types.ObjectId(),
                taskId,
                userId,
            });
            yield task.save();
            return "Assign task successfully";
        });
    }
    remove(taskManagerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskManagerModel.deleteOne({
                _id: taskManagerId,
            });
            return "Remove task successfully";
        });
    }
    taskList(userId, status, pageId, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryObject = status === 0
                ? { userId, status: task_manager_schema_1.TaskStatus.NotDone }
                : status === 1
                    ? { userId, status: task_manager_schema_1.TaskStatus.Done }
                    : { userId };
            const taskAmount = yield this.taskManagerModel.countDocuments(queryObject);
            const totalPage = Math.ceil(taskAmount / pageSize);
            const tasks = 0 < pageId && pageId <= totalPage
                ? yield this.taskManagerModel
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
        });
    }
    markDone(taskMangerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskManagerModel.updateOne({
                _id: taskMangerId,
            }, { status: task_manager_schema_1.TaskStatus.Done });
            return task.matchedCount !== 0
                ? "Mark done successfully"
                : "_id not match";
        });
    }
};
TaskManagerHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_manager_schema_1.TaskManager.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], TaskManagerHandler);
exports.TaskManagerHandler = TaskManagerHandler;
//# sourceMappingURL=task-manager.handler.js.map