import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { RegisterComponent } from "./features/auth/register/register.component";
import { VerifyComponent } from "./features/auth/verify/verify.component";
import { PropertyManagerComponent } from "./features/kanban/property-manager/property-manager.component";
import { TicketComponent } from "./features/kanban/ticket/ticket.component";
import { MaintenanceStaffComponent } from "./features/kanban/maintenance-staff/maintenance-staff.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { ManagerGuard } from "./shared/guards/manager.guard";
import { StaffGuard } from "./shared/guards/staff.guard";
import { TenantComponent } from "./features/tenants/tenant/tenant.component";
import { EmployeeComponent } from "./features/employees/employee/employee.component";
import { RegisterTenantComponent } from "./features/auth/register-tenant/register-tenant.component";
import { RegisterMaintenanceComponent } from "./features/auth/register-maintenance/register-maintenance.component";

const routes: Routes = [
	// {
	// 	path: "",
	// 	pathMatch: "full",
	// 	// canActivate: [AuthGuard],
	// 	component: AppComponent
	// },
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "register",
		component: RegisterComponent
	},
	{
		path: "verify",
		component: VerifyComponent
	},
	{
		path: "adminmanager",
		// canActivate: [StaffGuard],
		component: PropertyManagerComponent
	},
	{
		path: "ticket/:id",
		component: TicketComponent
	},
	{
		path: "assignedtasks/:id",
		component: MaintenanceStaffComponent
	},
  {
    path: "tenantlist",
    component: TenantComponent
  },
  {
    path: "employeelist",
    component: EmployeeComponent
  },
  {
    path: "registertenant",
    component: RegisterTenantComponent
  },
  {
    path: "registeremployee",
    component: RegisterMaintenanceComponent
  }
	// {
	//   path: 'addtenant'
	// },
	// {
	//   path: 'addstaff'
	// },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
