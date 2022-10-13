import mongoose from "mongoose";
import { TaskManager } from "../../schemas/task-mananger.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskManagerRepository } from "./task-manager.repository";
export declare class TaskManagerHandler implements TaskManagerRepository {
    private taskManagerModel;
    constructor(taskManagerModel: mongoose.Model<TaskManager>);
    assign(taskId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<string>;
    remove(taskManagerId: mongoose.Types.ObjectId): Promise<string>;
    taskList(userId: mongoose.Types.ObjectId, status: string, pageId: number, pageSize: number): Promise<Pagination<TaskManager>>;
    markDone(taskMangerId: mongoose.Types.ObjectId): Promise<string>;
    private getTaskManagerModel;
}
