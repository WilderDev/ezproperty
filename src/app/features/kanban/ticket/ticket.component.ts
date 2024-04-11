import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';

import { TicketService } from '../../../shared/services/ticket.service';
import { Ticket } from '../../../shared/models/ticket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit{

  form!: FormGroup;
  ticket: Ticket;
  id?: string;
  title!: string;

  isEditing = false;

  loading = false;
  submitting = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
    ) { }

    ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];


      // form with validation rules
      this.form = this.formBuilder.group({
        progress: [''],
        priorityLevel: [''],
        category: [''],
        // assignedWorker: [''],
        description: [''],
        });


    console.log(this.id)

    this.ticketService.getTicketById(this.id).pipe(first()).subscribe(x => {this.ticket = x; this.form.patchValue(x)
      this.loading = false;})
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
  Edit() {
    this.isEditing = !this.isEditing;

    }

    private saveTicket() {
      return this.id
      ?this.ticketService.updateTicket(this.id!, this.form.value)
      : this.ticketService.updateTicket(this.id!, this.form.value)
    }



}

