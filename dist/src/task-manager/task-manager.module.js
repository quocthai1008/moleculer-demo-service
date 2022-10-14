"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const task_mananger_schema_1 = require("../../schemas/task-mananger.schema");
const task_manager_controller_1 = require("./task-manager.controller");
const task_manager_handler_1 = require("./task-manager.handler");
let TaskManagerModule = class TaskManagerModule {
};
TaskManagerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: task_mananger_schema_1.TaskManager.name, schema: task_mananger_schema_1.TaskManagerSchema },
            ]),
        ],
        controllers: [task_manager_controller_1.TaskManagerController],
        providers: [task_manager_handler_1.TaskManagerHandler],
    })
], TaskManagerModule);
exports.TaskManagerModule = TaskManagerModule;
//# sourceMappingURL=task-manager.module.js.map