import { Service, ServiceBroker } from "moleculer";
declare class AppService extends Service {
    constructor(broker: ServiceBroker);
    serviceStart(): Promise<void>;
}
export default AppService;
