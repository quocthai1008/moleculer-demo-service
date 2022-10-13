"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moleculer_1 = require("moleculer");
class TaskManagerService extends moleculer_1.Service {
    constructor(broker) {
        super(broker);
        this.parseServiceSchema({
            name: "task-manager",
            hooks: {
                before: {},
            },
            actions: {},
            dependencies: ["app"],
        });
    }
}
exports.default = TaskManagerService;
//# sourceMappingURL=task-manager.service.js.map