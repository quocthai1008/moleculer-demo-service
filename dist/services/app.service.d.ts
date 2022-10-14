import { Service, ServiceBroker } from "moleculer";
declare class AppService extends Service {
    private app;
    constructor(broker: ServiceBroker);
    private getAppService;
    serviceStart(): Promise<void>;
}
export default AppService;
