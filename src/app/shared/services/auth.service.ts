import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(
		private httpClient: HttpClient,
		private cookieService: CookieService,
		private router: Router
	) {}

	// Function to Register New User
	register({ username, email, password }) {
		console.log(username, email, password);

		return this.httpClient.post(
			`${environment.API_URL}/auth/register`,
			{
				username,
				email,
				password
			},
			{ withCredentials: true }
		);
	}

	// Function to Login User
	// ! Need to Verify Route with Backend
	login({ email, password }) {
		return this.httpClient.post(
			`${environment.API_URL}/auth/login`,
			{
				email,
				password
			},
			{ withCredentials: true }
		);
	}

	// Used to check User Credentials
	me() {
		return this.httpClient.get(`${environment.API_URL}/auth/me`, { withCredentials: true });
	}

	// verificationToken, email

	verify(token, email) {
		return this.httpClient.post(`${environment.API_URL}/auth/verify`, {
			email: email,
			verificationToken: token
		});
	}

	// Removes User from Session, Deletes Cookie, Routes to Landing Page
	logout() {
		this.cookieService.delete("token");
		this.router.navigate(["/"]);
	}
}
