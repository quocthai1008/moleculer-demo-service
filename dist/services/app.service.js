"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const moleculer_1 = require("moleculer");
const app_module_1 = require("../src/app.module");
class AppService extends moleculer_1.Service {
    constructor(broker) {
        super(broker);
        this.parseServiceSchema({
            name: "app",
            started: this.serviceStart,
        });
    }
    async serviceStart() {
        await core_1.NestFactory.create(app_module_1.AppModule);
    }
}
exports.default = AppService;
//# sourceMappingURL=app.service.js.map