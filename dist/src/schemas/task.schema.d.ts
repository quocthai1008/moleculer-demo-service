import mongoose, { Document } from "mongoose";
export declare type TaskDocument = Task & Document;
export declare class Task {
    _id: mongoose.Types.ObjectId;
    name: string;
    detail: string;
    managerId: mongoose.Types.ObjectId;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, any>, {}, {}, {}, {}, "type", Task>;
