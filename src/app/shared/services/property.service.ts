import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { Property } from "../models/property";

@Injectable({ providedIn: "root" })
export class PropertyService {
	private propertySub = new BehaviorSubject<Property | undefined | null>(null);

	constructor(private router: Router, private http: HttpClient) {}

	public get currentProperty() {
		return this.propertySub.asObservable();
	}

	addNewProperty(property: Property): Observable<any> {
		return this.http.post(`${environment.API_URL}/properties/create`, property, {
			withCredentials: true
		});
	}

	getAllProperties() {
		return this.http
			.get<{ success: boolean; data: { properties: Property[] } }>(
				`${environment.API_URL}/properties/all`
			)
			.pipe(map((response) => response.data.properties));
	}

	getPropertyById(id: string) {
		return this.http
			.get<{ success: true; data: { property: Property } }>(
				`${environment.API_URL}/properties/find/${id}`
			)
			.pipe(map((response) => response.data.property));
	}

	updateProperty(id: string, params: any) {
		return this.http.patch(`${environment.API_URL}/properties/edit/${id}`, params).pipe(
			map((x) => {
				const property = { ...this.propertySub, ...params };

				this.propertySub.next(property);

				return x;
			})
		);
	}

	deleteProperty(id: string) {
		return this.http.delete(`${environment.API_URL}/properties/delete/${id}`).pipe(
			map((x) => {
				return x;
			})
		);
	}
}
