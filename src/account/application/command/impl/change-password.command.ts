import mongoose from "mongoose";

export class ChangePasswordCommand {
	constructor(
		public readonly userId: mongoose.Types.ObjectId,
		public readonly username: string,
		public readonly oldPassword: string,
		public readonly newPassword: string
	) {}
}
