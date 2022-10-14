import { Service, ServiceBroker } from "moleculer";
declare class TaskManagerService extends Service {
    constructor(broker: ServiceBroker);
    private assign;
    private remove;
    private taskList;
    private markDone;
    private assignHook;
    private checkTaskManagerExist;
    private checkTaskOwner;
    private handleTaskDelete;
}
export default TaskManagerService;
