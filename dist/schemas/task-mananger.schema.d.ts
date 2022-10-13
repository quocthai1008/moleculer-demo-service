import mongoose, { Document } from "mongoose";
export declare type TaskManagerDocument = TaskManager & Document;
export declare enum TaskStatus {
    NotDone = "Not Done",
    Done = "Done"
}
export declare class TaskManager {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    taskId: mongoose.Types.ObjectId;
    status: string;
}
export declare const TaskManagerSchema: mongoose.Schema<TaskManager, mongoose.Model<TaskManager, any, any, any, any>, {}, {}, {}, {}, "type", TaskManager>;
