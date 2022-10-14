import mongoose from "mongoose";
import { Task } from "../schemas/task.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskRepository } from "./task.repository";
export declare class TaskHandler implements TaskRepository {
    private taskModel;
    constructor(taskModel: mongoose.Model<Task>);
    checkTaskExist(taskId: mongoose.Types.ObjectId): Promise<boolean>;
    create(name: string, detail: string, managerId: mongoose.Types.ObjectId): Promise<string>;
    update(taskId: mongoose.Types.ObjectId, name: string, detail: string): Promise<string>;
    delete(taskId: mongoose.Types.ObjectId): Promise<string>;
    findAll(managerId: mongoose.Types.ObjectId, pageId: number, pageSize: number): Promise<Pagination<Task>>;
    findOne(taskId: mongoose.Types.ObjectId): Promise<Task>;
    isManager(taskId: mongoose.Types.ObjectId, managerId: mongoose.Types.ObjectId): Promise<boolean>;
}
