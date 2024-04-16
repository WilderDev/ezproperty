import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';

import { TicketService } from '../../../shared/services/ticket.service';
import { Ticket } from '../../../shared/models/ticket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { WorkerService } from '../../../shared/services/worker.service';
import { StaffService } from '../../../shared/services/staff.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit{

  form!: FormGroup;
  assignForm?: FormGroup;
  ticket: Ticket;
  id?: string;
  title!: string;
  workers?: any[];
  isEditing = false;

  loading = false;
  submitting = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private workerService: WorkerService,
    private staffService: StaffService
    ) { }

    ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];

      this.assignForm = this.formBuilder.group({
        assignedWorker: [''],
        progress: ['In-Progress']
      })

      // form with validation rules
      this.form = this.formBuilder.group({
        progress: [''],
        priorityLevel: [''],
        type: [''],
        // assignedWorker: [''],
        description: [''],
        });


    console.log(this.id)

    this.ticketService.getTicketById(this.id).pipe(first()).subscribe(x => {this.ticket = x; this.form.patchValue(x)
      this.loading = false;})

      this.staffService.getAllStaff().subscribe((staff) => {this.workers = staff
        console.log(staff)})
  }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    Submit( ) {

      console.log("form Values: ", this.form.value)

      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }

      this.submitting = true;
      this.saveTicket()
      .pipe(first()).subscribe({
        next: () => {

          console.log('Ticket Saved')
          this.router.navigateByUrl('/adminmanager');
        },
        error: error => {
          this.submitting = false;
        }
      })
  }

  assignSubmit( ) {

    console.log("form Values: ", this.form.value)

    this.submitted = true;

    // stop here if form is invalid
    if (this.assignForm.invalid) {
      return;
    }

    this.submitting = true;
    this.assignWorker()
    .pipe(first()).subscribe({
      next: () => {

        console.log('Ticket Saved')
        this.router.navigateByUrl('/adminmanager');
      },
      error: error => {
        this.submitting = false;
      }
    })
}
  Edit() {
    this.isEditing = !this.isEditing;

    }

    private saveTicket() {
      return this.id
      ?this.ticketService.updateTicket(this.id!, this.form.value)
      : this.ticketService.updateTicket(this.id!, this.form.value)
    }

    private assignWorker() {
      return this.id
      ?this.ticketService.assignWorker(this.id!, this.form.value)
      : this.ticketService.assignWorker(this.id!, this.form.value)
    }


}

