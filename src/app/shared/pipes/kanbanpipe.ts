import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'kanbanfilter',
  pure: false
})
export class KanbanFilterPipe implements PipeTransform {
  transform(tickets: any[], filter: string) {
      if (!tickets || !filter) {
        return tickets;
      }

      return tickets.filter(ticket => ticket.progress == filter)
  }

}
