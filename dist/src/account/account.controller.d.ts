import mongoose from "mongoose";
import { Account } from "../../schemas/account.schema";
import { AccountHandler } from "./account.handler";
import { JwtPayload } from "jsonwebtoken";
export declare class AccountController {
    static accountHandler: AccountHandler;
    constructor(accountHandler: AccountHandler);
    static register(username: string, password: string): Promise<string>;
    static login(username: string, password: string): Promise<string>;
    static verifyToken(token: string): JwtPayload | string;
    static getInfoById(userId: mongoose.Types.ObjectId): Promise<Account>;
    static update(userId: mongoose.Types.ObjectId, fullName: string, address: string): Promise<string | Error>;
    static changePassword(userId: mongoose.Types.ObjectId, username: string, oldPassword: string, newPassword: string): Promise<string>;
}
