export class Ticket {
	_id?: string;
	progress?: string;
	work?: string;
	priorityLevel?: string;
	assignedWorker?: string;
	propertyId?: {
		_id?: string;
		streetAddress?: string;
		aptNumber?: string;
		city?: string;
		state?: string;
		zipCode?: string;
	};
	description?: string;
	image?: string;
}
