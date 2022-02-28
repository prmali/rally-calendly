import axios from "axios";

const clientId = process.env.CALENDLY_CLIENT_ID;
const clientSecret = process.env.CALENDLY_CLIENT_SECRET;

const revokeToken = async (token) => {
	const { data } = await axios.post(
		"https://auth.calendly.com/oauth/revoke",
		{
			client_id: clientId,
			client_secret: clientSecret,
			token,
		},
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	);

	return data;
};

export default revokeToken;
