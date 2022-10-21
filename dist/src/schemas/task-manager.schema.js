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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagerSchema = exports.TaskManager = exports.TaskStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["NotDone"] = "Not Done";
    TaskStatus["Done"] = "Done";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
let TaskManager = class TaskManager {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], TaskManager.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], TaskManager.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], TaskManager.prototype, "taskId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: TaskStatus, default: TaskStatus.NotDone }),
    __metadata("design:type", String)
], TaskManager.prototype, "status", void 0);
TaskManager = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TaskManager);
exports.TaskManager = TaskManager;
exports.TaskManagerSchema = mongoose_1.SchemaFactory.createForClass(TaskManager);
//# sourceMappingURL=task-manager.schema.js.map