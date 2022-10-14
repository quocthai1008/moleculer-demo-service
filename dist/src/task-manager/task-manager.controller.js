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
var TaskManagerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagerController = void 0;
const common_1 = require("@nestjs/common");
const task_manager_handler_1 = require("./task-manager.handler");
let TaskManagerController = TaskManagerController_1 = class TaskManagerController {
    constructor(taskManagerHandler) {
        TaskManagerController_1.taskManagerHandler = taskManagerHandler;
    }
    static assign(taskId, userId) {
        return TaskManagerController_1.taskManagerHandler.assign(taskId, userId);
    }
    static remove(taskManagerId) {
        return TaskManagerController_1.taskManagerHandler.remove(taskManagerId);
    }
    static taskList(userId, status, pageId, pageSize) {
        return TaskManagerController_1.taskManagerHandler.taskList(userId, status, pageId, pageSize);
    }
    static markDone(taskMangerId) {
        return TaskManagerController_1.taskManagerHandler.markDone(taskMangerId);
    }
    static checkTaskManagerExist(taskMangerId) {
        return TaskManagerController_1.taskManagerHandler.checkTaskManagerExist(taskMangerId);
    }
    static checkTaskOwner(taskMangerId, userId) {
        return TaskManagerController_1.taskManagerHandler.checkTaskOwner(taskMangerId, userId);
    }
    static removeByTaskId(taskId) {
        TaskManagerController_1.taskManagerHandler.removeByTaskId(taskId);
    }
};
TaskManagerController = TaskManagerController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [task_manager_handler_1.TaskManagerHandler])
], TaskManagerController);
exports.TaskManagerController = TaskManagerController;
//# sourceMappingURL=task-manager.controller.js.map