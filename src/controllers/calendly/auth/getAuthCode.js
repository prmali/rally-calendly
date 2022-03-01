const clientId = process.env.CALENDLY_CLIENT_ID;
const redirectUri = process.env.CALENDLY_REDIRECT_URI;

const getAuthCode = () => {
	return `https://auth.calendly.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
};

export default getAuthCode;
