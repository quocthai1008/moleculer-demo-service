import mongoose from "mongoose";
import { AccountRepository } from "./account.repository";
import { Account } from "../schemas/account.schema";
import { JwtPayload } from "jsonwebtoken";
export declare class AccountHandler implements AccountRepository {
    private accountModel;
    constructor(accountModel: mongoose.Model<Account>);
    checkAccountExist(userId: mongoose.Types.ObjectId): Promise<boolean>;
    update(userId: mongoose.Types.ObjectId, fullName: string, address: string): Promise<string | Error>;
    changePassword(userId: mongoose.Types.ObjectId, username: string, oldPassword: string, newPassword: string): Promise<string>;
    getAccountById(userId: mongoose.Types.ObjectId): Promise<Account>;
    register(username: string, password: string): Promise<string>;
    login(username: string, password: string): Promise<string>;
    verifyToken(token: string): JwtPayload | string;
    private getAccountByName;
}
