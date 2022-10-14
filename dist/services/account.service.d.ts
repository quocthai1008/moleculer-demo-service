import { Service, ServiceBroker } from "moleculer";
declare class AccountService extends Service {
    constructor(broker: ServiceBroker);
    private register;
    private login;
    private update;
    private verifyToken;
    private changePassword;
    private getInfo;
    private checkAccountExist;
}
export default AccountService;
