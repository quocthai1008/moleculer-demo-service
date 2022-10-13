import mongoose, { Document } from "mongoose";
export declare type AccountDocument = Account & Document;
export declare class Account {
    _id: mongoose.Types.ObjectId;
    username: string;
    password: string;
    refreshToken: string;
    fullName: string;
    address: string;
}
export declare const AccountSchema: mongoose.Schema<Account, mongoose.Model<Account, any, any, any, any>, {}, {}, {}, {}, "type", Account>;
