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
		work: new FormArray([])
	});

	constructor(
		private authService: AuthService,
		private tenantService: TenantService,
		private formBuilder: FormBuilder,
		private router: Router,
		private ticketservice: TicketService
	) {}

	ngOnInit(): void {
		// const currentTenant = this.authService.me().subscribe((res) => {
		// 	res = res.data.user._id;
		// 	this.tenantService.getTenantById(res);
		// 	return currentTenant;
		// });
	}

	// ON SUBMIT FUNCTION
	onSubmit() {
		console.log("hello");
		// if (this.tenantIssueForm.invalid) return;
		console.log("hello2");
		const formValue = this.tenantIssueForm.getRawValue();
		if (!formValue) return;
		this.ticketservice.addNewTicket(formValue).subscribe((res) => {
			console.log(res);
		});
	}

	onCheckChange(event) {
		const formArray: FormArray = this.tenantIssueForm.get("work") as FormArray;

		if (event.target.checked) {
			formArray.push(new FormControl(event.target.value));
		} else {
			let i: number = 0;

			formArray.controls.forEach((ctrl: FormControl) => {
				if (ctrl.value == event.target.vaule) {
					formArray.removeAt(i);
					return;
				}

				i++;
			});
		}
	}
}

//navigate to tenant issuse form on login
// this.router.navigate(["/"])
