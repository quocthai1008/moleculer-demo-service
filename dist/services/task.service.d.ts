import { Service, ServiceBroker } from "moleculer";
declare class TaskService extends Service {
    private appService;
    constructor(broker: ServiceBroker);
    private create;
    private update;
    private delete;
    private findAll;
    private findOne;
    private isManger;
    private checkTaskExist;
    private checkPageParams;
    private checkTaskExistHook;
    started(): Promise<void>;
}
export default TaskService;
