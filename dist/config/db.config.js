"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfig = void 0;
const mongoose_1 = require("mongoose");
class DbConfig {
    static async connectDb() {
        return new Promise((resolve, reject) => {
            if (!DbConfig.connection) {
                mongoose_1.default.createConnection(process.env.CONNECTION_STRING || "", {}, (err, connection) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log("Connected");
                        DbConfig.connection = connection;
                    }
                });
            }
            resolve(DbConfig.connection);
        });
    }
}
exports.DbConfig = DbConfig;
//# sourceMappingURL=db.config.js.map