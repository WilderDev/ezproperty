import { Component } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Subscription } from "rxjs";

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

	private authSubscription = new Subscription();

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authSubscription = this.authService.me().subscribe((res) => {
			res = res.data.user;

			if (!res) {
				return (this.isAuthenticated = false);
			} else {
				return (this.isAuthenticated = true);
			}
		});
	}

	logout() {
		this.isAuthenticated = false;
		this.authService.logout();
	}
}
