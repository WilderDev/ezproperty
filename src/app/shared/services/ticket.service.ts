import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { Ticket } from "../models/ticket";


@Injectable({ providedIn: 'root'})
export class TicketService {
    private ticket = new BehaviorSubject<Ticket | undefined | null>(null)

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

    public get currentTicket() {
      return this.ticket.asObservable();
    }

    addNewTicket(ticket: Ticket) {
      return this.http.post(`${environment.API_URL}/tickets/create`, ticket)
    }

    getAllTickets() {
      return this.http.get<{success: boolean, data:{tickets: Ticket[]}}>(`${environment.API_URL}/tickets/all`).pipe(map(response => response.data.tickets))
    }

    getTicketById (id: string) {
      return this.http.get<Ticket>(`${environment.API_URL}/tickets/find/${id}`)
    }

    updateTicket (id: string, params: any) {
      return this.http.patch(`${environment.API_URL}/tickets/edit/${id}`, params).pipe(map(x => {
        const ticket = {...this.ticket, ...params};

        this.ticket.next(ticket);
        return x
      }))
    }

    deleteTicket (id: string) {
      return this.http.delete(`${environment.API_URL}/trailers/delete/${id}`).pipe(map(x => {
        return x
      }))
    }
}
