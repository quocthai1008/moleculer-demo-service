import mongoose from "mongoose";
export declare class UpdateTaskDto {
    taskId: mongoose.Types.ObjectId;
    name: string;
    detail: string;
}
