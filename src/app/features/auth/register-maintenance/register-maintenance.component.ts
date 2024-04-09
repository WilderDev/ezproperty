import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-maintenance',
  templateUrl: './register-maintenance.component.html',
  styleUrl: './register-maintenance.component.scss'
})
export class RegisterMaintenanceComponent {

  	// CREATE LOGIN FORM
	registerForm = new FormGroup({
		username: new FormControl("", [Validators.required]),
		email: new FormControl("", [Validators.required, Validators.email]), // make sure it is a valid email address
		password: new FormControl("", [Validators.required])
	});

  private authSubscription = new Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
	// On Submit Function
	onSubmit() {
    if (this.registerForm.invalid) return;
    const formValue = this.registerForm.getRawValue();

    if (!formValue) return;

    this.authSubscription.add(
      this.authService.register(formValue).subscribe((response) => {

        console.log(response)



        // Navigate to Home Page after Successful Register
        // this.router.navigate(['/'],)
      })
    )
	}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
