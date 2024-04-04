import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
	selector: "app-tenant-ticket-form",
	templateUrl: "./tenant-ticket-form.component.html",
	styleUrl: "./tenant-ticket-form.component.scss"
})
export class TenantTicketFormComponent implements OnInit {
	tenantIssueForm: FormGroup;

	ngOnInit(): void {
		this.tenantIssueForm = new FormGroup({
			username: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			gender: new FormControl("")
		});
	}
}
