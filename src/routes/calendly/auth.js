import express from "express";
import {
	getAuthCode,
	getAccessToken,
	refreshToken,
	revokeToken,
} from "controllers/calendly";

const router = express.Router();

router.get("/code", (req, res) => {
	try {
		const link = getAuthCode();
		if (!code) {
			throw "No code";
		}

		return res.status(200).send({ link });
	} catch (err) {
		console.error(err);
		return res.status(400).send({
			message: "Unable to retrieve Calendly authentication code.",
		});
	}
});

router.post("/token", async (req, res) => {
	try {
		const data = await getAccessToken(req.body.code);

		if (!data) {
			throw "No data";
		}

		// create calendly auth obj

		return res.status(200).send({
			data,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).send({
			message: "Unable to retrieve Calendly access token.",
		});
	}
});

router.post("/refresh", async (req, res) => {
	try {
		const data = await refreshToken(req.body.code);

		if (!data) {
			throw "No data";
		}

		// delete calendly auth obj

		return res.status(200).send({
			data,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).send({
			message: "Unable to retrieve Calendly access token.",
		});
	}
});

router.post("/revoke", async (req, res) => {
	try {
		const data = await revokeToken(req.body.code);

		if (!data) {
			throw "No data";
		}

		// delete calendly auth obj

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
