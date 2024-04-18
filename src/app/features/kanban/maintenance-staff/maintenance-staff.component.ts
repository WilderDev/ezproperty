import { Component } from "@angular/core";
import { TicketService } from "../../../shared/services/ticket.service";
import { first } from "rxjs";

@Component({
	selector: "app-maintenance-staff",
	templateUrl: "./maintenance-staff.component.html",
	styleUrl: "./maintenance-staff.component.scss"
})
export class MaintenanceStaffComponent {
	tickets?: any[];
	isMainView = true;

	constructor(private ticketService: TicketService) {}

	ngOnInit(): void {
		this.ticketService
			.getAllTickets()
			.pipe(first())
			.subscribe((tickets) => (this.tickets = tickets));
	}
}
