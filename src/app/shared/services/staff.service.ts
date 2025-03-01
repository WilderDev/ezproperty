import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

import { Staff } from "../models/staff";
import { response } from "express";

@Injectable({
	providedIn: "root"
})
export class StaffService {
	private staffsub = new BehaviorSubject<Staff | undefined | null>(null);

	constructor(private router: Router, private http: HttpClient) {}

	public get currentStaff() {
		return this.staffsub.asObservable();
	}

	addNewStaff(staff: Staff) {
		console.log(staff);
		return this.http.post(`${environment.API_URL}/workers/new-user`, staff, {
			withCredentials: true
		});
	}

	getAllStaff(): Observable<any> {
		return this.http
			.get<{ success: boolean; data: { staff: Staff[] } }>(
				`${environment.API_URL}/workers/get-all-workers`,
				{ withCredentials: true }
			)
			.pipe(map((response) => response.data));
	}

	getStaffById(id: string) {
		return this.http
			.get<{ success: true; data: { staff: Staff } }>(
				`${environment.API_URL}/workers/get-worker/${id}`,
				{ withCredentials: true }
			)
			.pipe(map((response) => response.data.staff));
	}

	updateStaff(id: string, params: any) {
		return this.http
			.patch(`${environment.API_URL}workers/edit/${id}`, params, { withCredentials: true })
			.pipe(
				map((x) => {
					const staff = { ...this.staffsub, ...params };

					this.staffsub.next(staff);

					return x;
				})
			);
	}

	deleteStaff(id: string) {
		return this.http
			.delete(`${environment.API_URL}/workers/delete/${id}`, { withCredentials: true })
			.pipe(
				map((x) => {
					return x;
				})
			);
	}
}
