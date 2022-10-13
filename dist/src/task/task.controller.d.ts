import mongoose from "mongoose";
import { Task } from "../../schemas/task.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskHandler } from "./task.handler";
export declare class TaskController {
    static taskHandler: TaskHandler;
    constructor(taskHandler: TaskHandler);
    static create(name: string, detail: string, managerId: mongoose.Types.ObjectId): Promise<String>;
    static update(taskId: mongoose.Types.ObjectId, name: string, detail: string): Promise<string>;
    static delete(taskId: mongoose.Types.ObjectId): Promise<string>;
    static findAll(managerId: mongoose.Types.ObjectId, pageId: number, pageSize: number): Promise<Pagination<Task>>;
    static findOne(taskId: mongoose.Types.ObjectId): Promise<Task>;
    static isManager(taskId: mongoose.Types.ObjectId, managerId: mongoose.Types.ObjectId): Promise<boolean>;
}
