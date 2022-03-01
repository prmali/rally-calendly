import axios from "axios";
import { CalendlyAccessModel } from "models/calendly";

const createInvite = async (ownerResource, eventId) => {
	const owner = await CalendlyAccessModel.findOne({
		owner_resource: ownerResource,
	});

	if (!owner) {
		throw "No owner belonging to event";
	}

	const { data } = await axios.post(
		"https://api.calendly.com/scheduling_links",
		{
			max_event_count: 1,
			owner: `https://api.calendly.com/event_types/${eventId}`,
			owner_type: "EventType",
		},
		{
			headers: {
				Authorization: `Bearer ${owner.access_token}`,
			},
		}
	);

	return data;
};

export default createInvite;
