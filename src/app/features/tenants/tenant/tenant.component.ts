import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { TenantService } from '../../../shared/services/tenant.service';


@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.scss'
})
export class TenantComponent
  implements OnInit{
    tenants?: any[];

    constructor(
      private tenantService: TenantService
    ) { }

    ngOnInit(): void {
      this.tenantService.getAllTenants().pipe(first()).subscribe(tenants => this.tenants = tenants)

    }
}
