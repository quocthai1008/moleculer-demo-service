"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const moleculer_1 = require("moleculer");
const app_module_1 = require("../src/app.module");
const account_handler_1 = require("../src/account/account.handler");
const task_handler_1 = require("../src/task/task.handler");
const task_manager_handler_1 = require("../src/task-manager/task-manager.handler");
class AppService extends moleculer_1.Service {
    constructor(broker) {
        super(broker);
        this.parseServiceSchema({
            name: "app",
            actions: {
                getAppService: {
                    handler: this.getAppService,
                },
            },
            started: this.serviceStart,
        });
    }
    getAppService(ctx) {
        const service = ctx.params.service;
        if (!service) {
            throw new Error("Missing service params");
        }
        switch (service.toLowerCase()) {
            case "account":
                return this.app.get(account_handler_1.AccountHandler);
            case "task":
                return this.app.get(task_handler_1.TaskHandler);
            case "task-manager":
                return this.app.get(task_manager_handler_1.TaskManagerHandler);
        }
    }
    async serviceStart() {
        await core_1.NestFactory.create(app_module_1.AppModule);
        this.app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    }
}
exports.default = AppService;
//# sourceMappingURL=app.service.js.map