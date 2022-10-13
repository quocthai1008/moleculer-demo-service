import mongoose from "mongoose";

export class DbConfig {
	private static connection: mongoose.Connection;
	public static async connectDb(): Promise<mongoose.Connection> {
		return new Promise((resolve, reject) => {
			if (!DbConfig.connection) {
				mongoose.createConnection(
					process.env.CONNECTION_STRING || "",
					{},
					(err, connection) => {
						if (err) {
							reject(err);
						} else {
							console.log("Connected");
							DbConfig.connection = connection;
						}
					}
				);
			}
			resolve(DbConfig.connection);
		});
	}
}
