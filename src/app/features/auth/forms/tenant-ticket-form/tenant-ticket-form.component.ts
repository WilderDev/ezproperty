import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { TenantService } from "../../../../shared/services/tenant.service";
import { AuthService } from "../../../../shared/services/auth.service";

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
		type: new FormControl("", [Validators.required]),
		priorityLevel: new FormControl("", [Validators.required]),
		description: new FormControl("", [Validators.required]),

		role: new FormControl("TENANT"),

		workSpecialization: new FormArray([])
	});

	constructor(
		private authService: AuthService,
		private tenantService: TenantService,
		private formBuilder: FormBuilder,
		private router: Router
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
		if (this.tenantIssueForm.invalid) return;
		const formValue = this.tenantIssueForm.getRawValue();

		if (!formValue) return;
	}

	onCheckChange(event) {
		const formArray: FormArray = this.tenantIssueForm.get("workSpecialization") as FormArray;

		if (event.target.checked) {
			formArray.push(new FormControl(event.target.vaule));
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
