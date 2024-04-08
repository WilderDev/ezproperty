import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, take, catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: "root"
})
export class AuthGuard {
	constructor(private authService: AuthService, private router: Router) {}

	// Function that checks for authorized user. If there is a user continue; If not, return to login page
	canActivate(): Observable<boolean> {
		return this.authService.me().pipe(
			map((response) => {
				// if the call was successful then return true

				return true; // this allows the user to access the route
			}),
			catchError((error) => {
				// Navigate to login on error
				this.router.navigate(["/", "login"]);
				// Return false so the user cannot access the route
				return of(false);
			})
		);
	}
}
