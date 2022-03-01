import { EventModel } from "models/event";

const restrictEvent = async (ownerResource, eventId, restrictions) => {
	const event = await EventModel.findOne({
		event_id: eventId,
	});

	if (event) {
		event.restrictions = restrictions;
		event.markModified("restrictions");
		await event.save();
	} else {
		await EventModel.create({
			owner_resource: ownerResource,
			event_id: eventId,
			restrictions: restrictions,
		});
	}

	return true;
};

export default restrictEvent;
