import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'urgencyfilter',
  pure: false
})
export class UrgencyFilterPipe implements PipeTransform {
  transform(tickets: any[], filter: string) {
      if (!tickets || !filter) {
        return tickets;
      }

      return tickets.filter(ticket => ticket.priorityLevel == filter)
  }

}
