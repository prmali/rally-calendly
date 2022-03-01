import express from "express";
import {
	getAuthCode,
	getAccessToken,
	refreshToken,
	revokeToken,
} from "controllers/calendly/auth";

import { CalendlyAccessModel } from "models/calendly";
import { EventModel } from "models/event";

const router = express.Router();

router.get("/code", (req, res) => {
	try {
		const link = getAuthCode();

		if (!link) {
			throw "No link";
		}

		return res.status(200).send({ link });
	} catch (err) {
		console.error(err);

		return res.status(400).send({
			message: "Unable to retrieve Calendly authentication code.",
		});
	}
});

router.get("/redirect", (req, res) => {
	try {
		res.redirect(
			`http://localhost:4000/calendly/token?code=${req.query.code}`
		);
	} catch (err) {
		console.error(err);

		return res.status(400).send({
			message: "Unable to redirect",
		});
	}
});

router.get("/token", async (req, res) => {
	try {
		const data = await getAccessToken(req.query.code);

		if (!data) {
			throw "No data";
		}

		await CalendlyAccessModel.create({
			...data,
			expires_at: data.created_at + data.expires_in,
			owner_resource: data.owner,
			org_resource: data.organization,
		});

		return res
			.status(200)
			.cookie("calendly-token", data.access_token, {
				maxAge: data.expires_in * 1000,
			})
			.send({
				access_token: data.access_token,
			});
	} catch (err) {
		console.error(err);

		return res.status(400).send({
			message: "Unable to retrieve Calendly access token.",
		});
	}
});

router.post("/token/refresh", async (req, res) => {
	try {
		const doc = await CalendlyAccessModel.findOne({
			access_token: req.headers["calendly-token"],
		});

		if (!doc) {
			throw "Invalid refresh token";
		}

		const data = await refreshToken(doc.refresh_token);

		if (!data) {
			throw "No data";
		}

		doc.created_at = data.created_at;
		doc.expires_at = data.created_at + data.expires_in;
		doc.refresh_token = data.refresh_token;
		doc.access_token = data.access_token;
		await doc.save();

		return res
			.status(200)
			.cookie("calendly-token", data.access_token, {
				maxAge: data.expires_in * 1000,
			})
			.send({
				access_token: data.access_token,
			});
	} catch (err) {
		console.error(err);

		return res.status(400).send({
			message: "Unable to retrieve Calendly access token.",
		});
	}
});

router.post("/token/revoke", async (req, res) => {
	try {
		const doc = await CalendlyAccessModel.findOne({
			access_token: req.headers["calendly-token"],
		});

		await EventModel.deleteMany({ owner_resource: doc.owner_resource });

		const data = await revokeToken(doc.access_token);

		if (!data) {
			throw "No data";
		}

		res.clearCookie("calendly-token");
		await doc.remove();

		return res.status(200).send({
			success: true,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).send({
			message: "Unable to retrieve Calendly access token.",
		});
	}
});

export default router;
