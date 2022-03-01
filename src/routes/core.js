import express from "express";
const router = express.Router();

import { CalendlyAccessModel } from "models/calendly";

import { getEvent } from "controllers/calendly/events";
import restrictEvent from "controllers/core/restrictEvent";

router.post("/events/:eventId/restrict", async (req, res) => {
	try {
		await getEvent(req.headers["calendly-token"], req.params.eventId);
		const user = await CalendlyAccessModel.findOne({
			access_token: req.headers["calendly-token"],
		});

		if (!user) {
			throw "Invalid access token";
		}

		const success = await restrictEvent(
			user.owner_resource,
			req.params.eventId,
			req.body.restrictions
		);

		return res.status(200).send({
			success,
		});
	} catch (err) {
		console.error(err);

		return res.status(400).send({
			message: "Unable to restrict event.",
		});
	}
});

export default router;
