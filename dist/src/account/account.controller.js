"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AccountController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_handler_1 = require("./account.handler");
let AccountController = AccountController_1 = class AccountController {
    constructor(accountHandler) {
        AccountController_1.accountHandler = accountHandler;
    }
    static register(username, password) {
        return AccountController_1.accountHandler.register(username, password);
    }
    static login(username, password) {
        return AccountController_1.accountHandler.login(username, password);
    }
    static verifyToken(token) {
        return AccountController_1.accountHandler.verifyToken(token);
    }
    static getInfoById(userId) {
        return AccountController_1.accountHandler.getAccountById(userId);
    }
    static update(userId, fullName, address) {
        return AccountController_1.accountHandler.update(userId, fullName, address);
    }
    static changePassword(userId, username, oldPassword, newPassword) {
        return AccountController_1.accountHandler.changePassword(userId, username, oldPassword, newPassword);
    }
};
AccountController = AccountController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [account_handler_1.AccountHandler])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map