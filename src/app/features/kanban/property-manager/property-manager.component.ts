import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';

import { TicketService } from '../../../shared/services/ticket.service';

@Component({
  selector: 'app-property-manager',
  templateUrl: './property-manager.component.html',
  styleUrl: './property-manager.component.scss'
})
export class PropertyManagerComponent implements OnInit{
  tickets?: any[];
  isMainView = true;

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
      this.ticketService.getAllTickets().pipe(first()).subscribe(tickets => this.tickets = tickets)

  }

  viewToggle() {
    this.isMainView = !this.isMainView
    console.log(this.isMainView)
  }
}
