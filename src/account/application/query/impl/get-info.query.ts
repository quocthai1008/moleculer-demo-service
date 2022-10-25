import mongoose from "mongoose";

export class GetInfoQuery {
	constructor(public readonly userId: mongoose.Types.ObjectId) {}
}
