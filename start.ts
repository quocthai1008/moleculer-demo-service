import { Service, ServiceBroker } from "moleculer";
import { AccountServiceSchema } from "./src/account/account.service";

class AccountService extends Service {
	constructor(broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema(AccountServiceSchema());
	}
}

export default AccountService;
