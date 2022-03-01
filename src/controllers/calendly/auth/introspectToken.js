import axios from "axios";

const introspectToken = async (token) => {
	const { data } = await axios.post(
		"https://auth.calendly.com/oauth/introspect",
		{
			client_id: process.env.CALENDLY_CLIENT_ID,
			client_secret: process.env.CALENDLY_CLIENT_SECRET,
			token,
		}
	);

	return data;
};

export default introspectToken;
