import mongoose from "mongoose";
import { TaskManager } from "../../schemas/task-mananger.schema";
import { Pagination } from "../interfaces/pagination.interface";
import { TaskManagerHandler } from "./task-manager.handler";
export declare class TaskManagerController {
    static taskManagerHandler: TaskManagerHandler;
    constructor(taskManagerHandler: TaskManagerHandler);
    static assign(taskId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<string>;
    static remove(taskManagerId: mongoose.Types.ObjectId): Promise<string>;
    static taskList(userId: mongoose.Types.ObjectId, status: string, pageId: number, pageSize: number): Promise<Pagination<TaskManager>>;
    static markDone(taskMangerId: mongoose.Types.ObjectId): Promise<string>;
}
