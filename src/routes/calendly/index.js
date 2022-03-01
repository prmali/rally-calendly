import express from "express";

import authRouter from "./auth";
import { getEvents, getEvent } from "controllers/calendly/events";
import createInvite from "controllers/calendly/createInvite";
import { CalendlyAccessModel } from "models/calendly";
import { EventModel } from "models/event";

const router = express.Router();

router.use(authRouter);

router.get("/events", async (req, res) => {
	try {
		const user = await CalendlyAccessModel.findOne({
			access_token: req.headers["calendly-token"],
		});

		if (!user) {
			throw "Invalid access token";
		}

		const events = await getEvents(
			req.headers["calendly-token"],
			user.owner_resource
		);

		return res.status(200).send({
			events,
		});
	} catch (err) {
		console.error(err);

		return res.status(400).send({
			message: "Unable to retrieve your events.",
		});
	}
});

router.get("/events/:eventId", async (req, res) => {
	try {
		const user = await CalendlyAccessModel.findOne({
			access_token: req.headers["calendly-token"],
		});

		if (!user) {
			throw "Invalid access token";
		}

		const event = await getEvent(
			req.headers["calendly-token"],
			req.params.eventId
		);

		return res.status(200).send({
			event,
		});
	} catch (err) {
		console.error(err);

		return res.status(400).send({
			message: "Unable to retrieve your events.",
		});
	}
});

router.get("/events/:eventId/invite", async (req, res) => {
	try {
		const event = await EventModel.findOne({
			event_id: req.params.eventId,
		});

		if (!event) {
			throw "Non-existent event";
		}
		// get user balance
		// match user against restrictions

		const invite = await createInvite(
			event.owner_resource,
			req.params.eventId
		);
		return res.status(200).send({
			invite,
		});
	} catch (err) {
		console.error(err);

		return res.status(429).send({
			message: "Unable to retrieve invite.",
		});
	}
});

export default router;
