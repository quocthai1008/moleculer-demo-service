import { NestFactory } from "@nestjs/core";
import { Service, ServiceBroker } from "moleculer";
import { AppModule } from "../src/app.module";

class AppService extends Service {
	constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "app",

			started: this.serviceStart,
		});
	}

	async serviceStart() {
		await NestFactory.create(AppModule);
	}
}

export default AppService;
