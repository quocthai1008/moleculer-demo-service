import mongoose from "mongoose";
export declare class DbConfig {
    private static connection;
    static connectDb(): Promise<mongoose.Connection>;
}
