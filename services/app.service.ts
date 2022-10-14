import { NestFactory } from "@nestjs/core";
import { Service, ServiceBroker } from "moleculer";
import { AppModule } from "../src/app.module";
import { INestApplicationContext } from "@nestjs/common";
import { AccountHandler } from "../src/account/account.handler";
import { TaskHandler } from "../src/task/task.handler";
import { TaskManagerHandler } from "../src/task-manager/task-manager.handler";

class AppService extends Service {
	private app: INestApplicationContext;
	constructor(broker: ServiceBroker) {
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

	private getAppService(ctx: any) {
		const service = ctx.params.service;
		if (!service) {
			throw new Error("Missing service params");
		}
		switch (service.toLowerCase()) {
			case "account":
				return this.app.get(AccountHandler);
			case "task":
				return this.app.get(TaskHandler);
			case "task-manager":
				return this.app.get(TaskManagerHandler);
		}
	}

	async serviceStart() {
		await NestFactory.create(AppModule);
		this.app = await NestFactory.createApplicationContext(AppModule);
	}
}

export default AppService;
