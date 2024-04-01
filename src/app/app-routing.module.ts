import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { RegisterComponent } from "./features/auth/register/register.component";
import { VerifyComponent } from "./features/auth/verify/verify.component";
import { PropertyManagerComponent } from "./features/kanban/property-manager/property-manager.component";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		component: AppComponent
	},
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
  // {
  //   path: "kanban",
  //   component: PropertyManagerComponent,
  // children: [
  //   {
  //     path: 'ticket/:id',
  //     component: TicketEditComponent
  //   }
  // ]
  // }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
