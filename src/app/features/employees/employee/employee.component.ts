import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { StaffService } from '../../../shared/services/staff.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent
  implements OnInit{
    workers?: any[];

    constructor(
      private staffService: StaffService
    ) { }

    ngOnInit(): void {
      this.staffService.getAllStaff().pipe(first()).subscribe(staff => this.workers = staff)

    }
}
