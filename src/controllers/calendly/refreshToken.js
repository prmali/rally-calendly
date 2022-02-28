import axios from "axios";

const clientId = process.env.CALENDLY_CLIENT_ID;
const clientSecret = process.env.CALENDLY_CLIENT_SECRET;

const refreshToken = async (token) => {
	const { data } = await axios.post(
		"https://auth.calendly.com/oauth/token",
		{
			grant_type: "refresh_token",
			client_id: clientId,
			client_secret: clientSecret,
			refresh_token: token,
		},
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	);

	return data;
};

export default refreshToken;
