import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
	@Prop({ required: true })
	_id: mongoose.Types.ObjectId;

	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true })
	password: string;

	@Prop({ default: "" })
	refreshToken: string;

	@Prop({ default: "" })
	fullName: string;

	@Prop({ default: "" })
	address: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
