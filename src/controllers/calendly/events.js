import axios from "axios";

const getEvents = async (accessToken, user) => {
	const { data } = await axios.get("https://api.calendly.com/event_types", {
		params: {
			active: true,
			user: user,
		},
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return data;
};

const getEvent = async (accessToken, eventId) => {
	const { data } = await axios.get(
		`https://api.calendly.com/event_types/${eventId}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	return data;
};

export { getEvents, getEvent };
