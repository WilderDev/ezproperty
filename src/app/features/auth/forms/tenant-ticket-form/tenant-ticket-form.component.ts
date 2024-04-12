import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
	selector: "app-tenant-ticket-form",
	templateUrl: "./tenant-ticket-form.component.html",
	styleUrl: "./tenant-ticket-form.component.scss"
})
export class TenantTicketFormComponent {

	public specializations: Array<any> = [
		{ description: "HVAC", value: "HVAC" },
		{ description: "Electrical", value: "ELECTRICAL" },
		{ description: "Plumbing", value: "PLUMBING" },
		{ description: "Structural", value: "STRUCTURAL" },
		{ description: "General", value: "GENERAL" }
	];

// CREATE TENANT ISSUE FORM
tenantIssueForm = new FormGroup({
  username: new FormControl("", [Validators.required]),
  email: new FormControl("", [Validators.required]),

  role: new FormControl("TENANT"),

  firstName: new FormControl("", [Validators.required]),
  middleInitial: new FormControl("",[Validators.required]),
  lastName: new FormControl("", [Validators.required]),
  phoneNumber: new FormControl("", [Validators.required]),
  workSpecialization: new FormArray([])
});

constructor(
  private formBuilder: FormBuilder,
  private router; Router
) {}

// ON SUBMIT FUNCTION
onSubmit(){
  if (this.tenantIssueForm.invalid) return;
  const formValue = this.tenantIssueForm.getRawValue();

  if (!formValue) return;
  //TODO finish this
}

onCheckChange(event){
  const formArray: FormArray = this.tenantIssueForm.get('workSpecialization') as FormArray;

  if(event.target.checked){
    formArray.push(new FormControl(event.target.vaule));
  }
  else{
    let i:number = 0;

    formArray.controls.forEach((ctrl: FormControl) => {
      if(ctrl.value == event.target.vaule) {
        formArray.removeAt(i);
        return;
      }

      i++;
    });
  }
}
}

