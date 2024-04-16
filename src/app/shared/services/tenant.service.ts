import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";

import { Tenant } from "../models/tenant";
import { response } from "express";

@Injectable({
	providedIn: "root"
})
export class TenantService {
	private tenantSub = new BehaviorSubject<Tenant | undefined | null>(null);

	constructor(private router: Router, private http: HttpClient) {}

	public get currentTenant() {
		return this.tenantSub.asObservable();
	}

	addNewTenant(tenant: Tenant) {
		return this.http.post(`${environment.API_URL}/tenants/new-user`, tenant, {
			withCredentials: true
		});
	}

	getAllTenants(): Observable<any> {
		return this.http
			.get<{ success: boolean; data: { tenants: Tenant[] } }>(
				`${environment.API_URL}/tenants/get-all-tenants`,
				{ withCredentials: true }
			)
			.pipe(map((response) => response.data));
	}

	getTenantById(id: string): Observable<any> {
		return this.http
			.get<{ success: true; data: { tenant: Tenant } }>(
				`${environment.API_URL}/tenants/get-tenant/${id}`,
				{ withCredentials: true }
			)
			.pipe(map((response) => response.data));
	}

	// NEED BACKEND ROUTE/CONTROLLER
	updateTenant(id: string, params: any) {
		return this.http
			.patch(`${environment.API_URL}/tenants/edit/${id}`, params, { withCredentials: true })
			.pipe(
				map((x) => {
					const tenant = { ...this.tenantSub, ...params };

					this.tenantSub.next(tenant);

					return x;
				})
			);
	}

	// NEED BACKEND ROUTE/CONTROLLER AUTH??
	deleteTenant(id: string) {
		return this.http
			.delete(`${environment.API_URL}/remove-tenant/${id}`, { withCredentials: true })
			.pipe(
				map((x) => {
					return x;
				})
			);
	}
}
