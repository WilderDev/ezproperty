import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-maintenance',
  templateUrl: './register-maintenance.component.html',
  styleUrl: './register-maintenance.component.scss'
})
export class RegisterMaintenanceComponent {

  public specializations: Array<any> = [
    {description: 'HVAC', value: 'HVAC'},
    {description: 'Electrical', value: 'ELECTRICAL'},
    {description: 'Plumbing', value: 'PLUMBING'},
    {description: 'Structural', value: 'STRUCTURAL'},
    {description: 'General', value: 'GENERAL'}
  ]


  	// CREATE LOGIN FORM
	employeeRegisterForm = new FormGroup({
		username: new FormControl("", [Validators.required]),
		email: new FormControl("", [Validators.required, Validators.email]), // make sure it is a valid email address
		password: new FormControl("", [Validators.required]),

    role: new FormControl("WORKER"),

    firstName: new FormControl("", [Validators.required]),
    middleInitial: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    startShift: new FormControl(""),
    endShift: new FormControl(""),
    workSpecialization: new FormArray([])


	});

  private authSubscription = new Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
	// On Submit Function
	onSubmit() {
    if (this.employeeRegisterForm.invalid) return;
    const formValue = this.employeeRegisterForm.getRawValue();

    console.log(formValue)

    if (!formValue) return;

    this.authSubscription.add(
      this.authService.register(formValue).subscribe((response) => {

        console.log(response)



        // Navigate to Home Page after Successful Register
        this.router.navigate(['/employeelist'],)
      })
    )
	}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onCheckChange(event) {
    const formArray: FormArray = this.employeeRegisterForm.get('workSpecialization') as FormArray;

    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }

}
}
