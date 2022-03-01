import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";

import router from "routes";

const app = express();

try {
	mongoose.connect("mongodb://localhost:27017/rally-calendly", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("🔗 Mongodb Up");
} catch (err) {
	console.log("💥 Mongodb Down");
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.listen(process.env.PORT || 4000, () => {
	console.log(
		`🚀 Rally-Calendly started @ http://localhost:${
			process.env.PORT || 4000
		}`
	);
});

/* {
		credentials: true,
		origin: (origin, callback) => {
			const validOrigin = whitelistedOrigins.indexOf(origin) !== -1;
			callback(null, { origin: validOrigin });
		},
	} */
