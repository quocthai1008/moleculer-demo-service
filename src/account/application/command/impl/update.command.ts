import mongoose from "mongoose";

export class UpdateCommand {
	constructor(
		public readonly userId: mongoose.Types.ObjectId,
		public readonly fullName: string,
		public readonly address: string
	) {}
}
