import { Service, ServiceBroker } from "moleculer";
declare class AccountService extends Service {
    private appService;
    constructor(broker: ServiceBroker);
    private register;
    private login;
    private update;
    private verifyToken;
    private changePassword;
    private getInfo;
    private checkAccountExist;
    started(): Promise<void>;
}
export default AccountService;
