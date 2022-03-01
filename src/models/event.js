import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RestrictionSchema = new Schema({
	type: { type: String, enum: ["COIN", "NFT"] },
	symbol: String,
	min_amount: Number,
	expire_at: { type: Date, default: Date.now, expires: 14 * 24 * 60 * 60 },
});

const EventSchema = new Schema({
	owner_resource: String,
	event_id: String,
	restrictions: [RestrictionSchema],
});

const EventModel = mongoose.model("event", EventSchema);

export { EventSchema, EventModel };
