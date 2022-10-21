"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const account_model_1 = require("./infrastructure/model/account.model");
const account_provider_1 = require("./interface/account.provider");
const user_repository_1 = require("./infrastructure/repositories/user.repository");
const handlers_1 = require("./application/command/handlers");
const cqrs_1 = require("@nestjs/cqrs");
const handler_1 = require("./application/query/handler");
let AccountModule = class AccountModule {
};
AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.CONNECTION_STRING),
            mongoose_1.MongooseModule.forFeature([
                { name: account_model_1.Account.name, schema: account_model_1.AccountSchema },
            ]),
        ],
        providers: [
            user_repository_1.AccountRepositoryImpl,
            ...handlers_1.AccountCommandHandler,
            ...handler_1.AccountQueryHandler,
        ],
        controllers: [account_provider_1.AccountProvider],
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map