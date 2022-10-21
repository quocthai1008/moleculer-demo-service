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
exports.TaskHandler = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const task_schema_1 = require("../schemas/task.schema");
let TaskHandler = class TaskHandler {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    checkTaskExist(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.taskModel
                .findOne({ _id: taskId })
                .select("_id")
                .lean();
            return check ? true : false;
        });
    }
    create(name, detail, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.create({
                _id: new mongoose_2.default.Types.ObjectId(),
                name,
                detail,
                managerId,
            });
            yield task.save();
            return "Create task successfully";
        });
    }
    update(taskId, name, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.updateOne({
                _id: taskId,
            }, { name, detail });
            return task.matchedCount !== 0
                ? "Update task successfully"
                : "_id not match";
        });
    }
    delete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskModel.deleteOne({
                _id: taskId,
            });
            return "Delete task successfully";
        });
    }
    findAll(managerId, pageId, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskAmount = yield this.taskModel.countDocuments({
                managerId,
            });
            const totalPage = Math.ceil(taskAmount / pageSize);
            const tasks = 0 < pageId && pageId <= totalPage
                ? yield this.taskModel
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
        });
    }
    findOne(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.findById(taskId);
            return task;
        });
    }
    isManager(taskId, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.findOne({ _id: taskId, managerId });
            return task ? true : false;
        });
    }
};
TaskHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], TaskHandler);
exports.TaskHandler = TaskHandler;
//# sourceMappingURL=task.handler.js.map