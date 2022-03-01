import axios from "axios";

const clientId = process.env.CALENDLY_CLIENT_ID;
const clientSecret = process.env.CALENDLY_CLIENT_SECRET;
const redirectUri = process.env.CALENDLY_REDIRECT_URI;

const getAccessToken = async (code) => {
	const { data } = await axios.post("https://auth.calendly.com/oauth/token", {
		grant_type: "authorization_code",
		client_id: clientId,
		client_secret: clientSecret,
		redirect_uri: redirectUri,
		code,
	});

	return data;
};

export default getAccessToken;
