import { Service, ServiceBroker } from "moleculer";
declare class TaskManagerService extends Service {
    private appService;
    constructor(broker: ServiceBroker);
    private assign;
    private remove;
    private taskList;
    private markDone;
    private assignHook;
    private checkTaskManagerExist;
    private checkTaskOwner;
    private handleTaskDelete;
    started(): Promise<void>;
}
export default TaskManagerService;
