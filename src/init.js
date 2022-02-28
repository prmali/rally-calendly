import axios from "axios";
import "dotenv/config";

const options = {
	method: "GET",
	url: "https://auth.calendly.com/oauth/authorize",
	params: {
		response_type: "code",
		redirect_uri: "https://my.site.com/auth/calendly",
	},
	headers: { "Content-Type": "application/json" },
};

axios
	.request(options)
	.then(function (response) {
		console.log(response.data);
	})
	.catch(function (error) {
		console.error(error);
	});
