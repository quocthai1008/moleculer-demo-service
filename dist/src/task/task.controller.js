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
var TaskController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_handler_1 = require("./task.handler");
let TaskController = TaskController_1 = class TaskController {
    constructor(taskHandler) {
        TaskController_1.taskHandler = taskHandler;
    }
    static create(name, detail, managerId) {
        return TaskController_1.taskHandler.create(name, detail, managerId);
    }
    static update(taskId, name, detail) {
        return TaskController_1.taskHandler.update(taskId, name, detail);
    }
    static delete(taskId) {
        return TaskController_1.taskHandler.delete(taskId);
    }
    static findAll(managerId, pageId, pageSize) {
        return TaskController_1.taskHandler.findAll(managerId, pageId, pageSize);
    }
    static findOne(taskId) {
        return TaskController_1.taskHandler.findOne(taskId);
    }
    static isManager(taskId, managerId) {
        return TaskController_1.taskHandler.isManager(taskId, managerId);
    }
    static checkTaskExist(taskId) {
        return TaskController_1.taskHandler.checkTaskExist(taskId);
    }
};
TaskController = TaskController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [task_handler_1.TaskHandler])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map