import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { state } from "@angular/animations";
import { PropertyService } from "../../../shared/services/property.service";

@Component({
	selector: "app-register-tenant",
	templateUrl: "./register-tenant.component.html",
	styleUrl: "./register-tenant.component.scss"
})
export class RegisterTenantComponent {
	manager: {};

	// CREATE LOGIN FORM
	tenantregisterForm = new FormGroup({
		property: new FormGroup({
			streetAddress: new FormControl("", Validators.required),
			aptNumber: new FormControl("", Validators.required),
			city: new FormControl("", Validators.required),
			state: new FormControl("", Validators.required),
			zipCode: new FormControl("", Validators.required),
			currentTenant: new FormControl()
		}),
		user: new FormGroup({
			role: new FormControl("TENANT"),
			manager: new FormControl(),

			firstName: new FormControl(""),
			middleInitial: new FormControl(""),
			lastName: new FormControl(""),
			phoneNumber: new FormControl(""),

			username: new FormControl("", [Validators.required]),
			email: new FormControl("", [Validators.required, Validators.email]), // make sure it is a valid email address
			password: new FormControl("", [Validators.required])
		})
	});

	private authSubscription = new Subscription();

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private propertyService: PropertyService,
		private router: Router
	) {}
	// On Submit Function
	onSubmit() {
		if (this.tenantregisterForm.invalid) return;

		// const managerid = this.authService.me().subscribe(user => this.manager = user)

		// console.log(managerid)

		const formValue = this.tenantregisterForm.getRawValue();

		if (!formValue) return;

		this.propertyService
			.addNewProperty(formValue.property)
			.subscribe((res) => console.log(res));

		this.authSubscription.add(
			this.authService.register(formValue.user).subscribe((response) => {
				console.log(response);

				// Navigate to Home Page after Successful Register
				this.router.navigate(["/tenantlist"]);
			})
		);
	}

	ngOnDestroy() {
		this.authSubscription.unsubscribe();
	}
}
