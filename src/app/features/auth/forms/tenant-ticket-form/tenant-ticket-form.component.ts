import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { TenantService } from "../../../../shared/services/tenant.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { TicketService } from "../../../../shared/services/ticket.service";
import { response } from "express";

@Component({
	selector: "app-tenant-ticket-form",
	templateUrl: "./tenant-ticket-form.component.html",
	styleUrl: "./tenant-ticket-form.component.scss"
})
export class TenantTicketFormComponent implements OnInit {
	public specializations: Array<any> = [
		{ description: "HVAC", value: "HVAC" },
		{ description: "Electrical", value: "ELECTRICAL" },
		{ description: "Plumbing", value: "PLUMBING" },
		{ description: "Structural", value: "STRUCTURAL" },
		{ description: "General", value: "GENERAL" }
	];

	// CREATE TENANT ISSUE FORM
	tenantIssueForm = new FormGroup({
		priorityLevel: new FormControl("", [Validators.required]),
		description: new FormControl("", [Validators.required]),
		progress: new FormControl("BACKLOG"),
		work: new FormControl("")
	});

	constructor(
		private authService: AuthService,
		private tenantService: TenantService,
		private formBuilder: FormBuilder,
		private router: Router,
		private ticketservice: TicketService
	) {}

	ngOnInit(): void {
		const currentTenant = this.authService.me().subscribe((res) => {
			res = res.data.user._id;
			this.tenantService.getTenantById(res);
			return currentTenant;
		});
	}

	// ON SUBMIT FUNCTION
	onSubmit() {
		if (this.tenantIssueForm.invalid) return;
		const formValue = this.tenantIssueForm.getRawValue();
		if (!formValue) return;
		this.ticketservice.addNewTicket(formValue).subscribe((res) => {
			console.log(res);
			// Navigate to Home Page after Successful Register
			this.router.navigate(["/tenantissueform"]);
		});
	}
}
