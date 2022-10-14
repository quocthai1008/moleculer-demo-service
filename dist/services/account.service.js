"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_1 = require("moleculer");
const mongoose_1 = require("mongoose");
class AccountService extends moleculer_1.Service {
    constructor(broker) {
        super(broker);
        this.parseServiceSchema({
            name: "account",
            actions: {
                register: {
                    rest: {
                        method: "POST",
                        path: "/register",
                    },
                    params: {
                        username: "string",
                        password: { type: "string", min: 6 },
                    },
                    handler: this.register,
                },
                login: {
                    rest: {
                        method: "POST",
                        path: "/login",
                    },
                    params: {
                        username: "string",
                        password: "string",
                    },
                    handler: this.login,
                },
                update: {
                    rest: {
                        method: "PUT",
                        path: "/update",
                    },
                    params: {
                        fullName: "string",
                        address: "string",
                    },
                    handler: this.update,
                },
                changePassword: {
                    rest: {
                        method: "PUT",
                        path: "/changePassword",
                    },
                    params: {
                        oldPassword: "string",
                        newPassword: { type: "string", min: 6 },
                    },
                    handler: this.changePassword,
                },
                getInfo: {
                    rest: {
                        method: "GET",
                        path: "/getInfo",
                    },
                    handler: this.getInfo,
                },
                verifyToken: {
                    handler: this.verifyToken,
                },
                checkAccountExist: {
                    handler: this.checkAccountExist,
                },
            },
            started: this.started,
            dependencies: ["app"],
        });
    }
    async register(ctx) {
        const { username, password } = ctx.params;
        const res = await this.appService.register(username, password);
        return res;
    }
    async login(ctx) {
        const { username, password } = ctx.params;
        const res = await this.appService.login(username, password);
        return res;
    }
    async update(ctx) {
        const { _id } = ctx.meta.user;
        const { fullName, address } = ctx.params;
        const res = await this.appService.update(new mongoose_1.default.Types.ObjectId(_id), fullName, address);
        return res;
    }
    async verifyToken(ctx) {
        const { token } = ctx.params;
        const res = this.appService.verifyToken(token);
        return res;
    }
    async changePassword(ctx) {
        const { oldPassword, newPassword } = ctx.params;
        const { _id, username } = ctx.meta.user;
        const res = await this.appService.changePassword(new mongoose_1.default.Types.ObjectId(_id), username, oldPassword, newPassword);
        return res;
    }
    async getInfo(ctx) {
        const { _id } = ctx.meta.user;
        const res = this.appService.getAccountById(new mongoose_1.default.Types.ObjectId(_id));
        return res;
    }
    async checkAccountExist(ctx) {
        const { userId } = ctx.params;
        const res = await this.appService.checkAccountExist(new mongoose_1.default.Types.ObjectId(userId));
        return res;
    }
    async started() {
        this.appService = await this.broker.call("app.getAppService", {
            service: "account",
        });
    }
}
exports.default = AccountService;
//# sourceMappingURL=account.service.js.map