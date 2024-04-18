import { Component } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Observable, Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrl: "./navbar.component.scss"
})
export class NavbarComponent {
	isAuthenticated = false;
	isManager = false;
	isStaff = false;
	isTenant = false;

	authSubscription: Subscription;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.authSubscription = this.authService.me().subscribe(
					(res) => {
						const user = res.data.user;
						this.isAuthenticated = true;

						if (user.role === "MANAGER") {
							this.isManager = true;
						}
						if (user.role === "WORKER") {
							this.isStaff = true;
						}
						if (user.role === "TENANT") {
							this.isTenant = true;
						}
					},
					(error) => {
						this.isAuthenticated = false;
					}
				);
			}
		});
	}

	logout() {
		this.isAuthenticated = false;
    this.isManager = false;
    this.isStaff = false;
    this.isTenant = false;
		this.authService.logout().subscribe((res) => {
			this.router.navigate(["/"]);
		});
	}
}
