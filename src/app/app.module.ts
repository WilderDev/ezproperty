import { NgModule } from "@angular/core";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { RegisterComponent } from "./features/auth/register/register.component";
import { HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { VerifyComponent } from './features/auth/verify/verify.component';
import { PropertyManagerComponent } from './features/kanban/property-manager/property-manager.component';
import { TicketComponent } from './features/kanban/ticket/ticket.component';
import { MaintenanceStaffComponent } from './features/kanban/maintenance-staff/maintenance-staff.component';
import { RegisterTenantComponent } from './features/auth/register-tenant/register-tenant.component';
import { RegisterMaintenanceComponent } from './features/auth/register-maintenance/register-maintenance.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { TenantComponent } from './features/tenants/tenant/tenant.component';
import { EmployeeComponent } from './features/employees/employee/employee.component';
import { KanbanFilterPipe } from "./shared/pipes/kanbanpipe";
import { UrgencyFilterPipe } from "./shared/pipes/urgencypipe";

@NgModule({
	declarations: [AppComponent, LoginComponent, RegisterComponent, VerifyComponent, PropertyManagerComponent, TicketComponent, MaintenanceStaffComponent, RegisterTenantComponent, RegisterMaintenanceComponent, NavbarComponent, TenantComponent, EmployeeComponent, KanbanFilterPipe, UrgencyFilterPipe],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
	providers: [provideClientHydration(), provideHttpClient(withInterceptorsFromDi(),withFetch())],
	bootstrap: [AppComponent]
})
export class AppModule {}
