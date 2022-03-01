import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CalendlyAccessSchema = new Schema({
	token_type: String,
	created_at: Date,
	expires_at: Date,
	refresh_token: String,
	access_token: String,
	scope: String,
	owner_resource: String,
	org_resource: String,
});

const CalendlyAccessModel = mongoose.model("calendly", CalendlyAccessSchema);

export { CalendlyAccessSchema, CalendlyAccessModel };
