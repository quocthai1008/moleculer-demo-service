import { Service, ServiceBroker } from "moleculer";
declare class TaskService extends Service {
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
}
export default TaskService;
