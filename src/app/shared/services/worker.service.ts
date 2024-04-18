import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";

import { Worker } from "../models/worker";

@Injectable({
	providedIn: "root"
})
export class WorkerService {
	private workerSub = new BehaviorSubject<Worker | undefined | null>(null);

	constructor(private router: Router, private http: HttpClient) {}

	public get currentWorker() {
		return this.workerSub.asObservable();
	}

	addNewWorker(worker: Worker) {
		return this.http.post(`${environment.API_URL}/workers/new-user`, worker, {
			withCredentials: true
		});
	}

	getAllWorkers(): Observable<any> {
		return this.http
			.get<{ success: boolean; data: { workers: Worker[] } }>(
				`${environment.API_URL}/workers/get-all-workers`,
				{ withCredentials: true }
			)
			.pipe(map((response) => response.data.workers));
	}

	getWorkerById(id: string) {
		return this.http
			.get<{ success: true; data: { worker: Worker } }>(
				`${environment.API_URL}/workers/get-worker/${id}`,
				{ withCredentials: true }
			)
			.pipe(map((response) => response.data.worker));
	}

	// NEED BACKEND ROUTE/CONTROLLER
	updateWorker(id: string, params: any) {
		return this.http
			.patch(`${environment.API_URL}/workers/edit/${id}`, params, { withCredentials: true })
			.pipe(
				map((x) => {
					const worker = { ...this.workerSub, ...params };

					this.workerSub.next(worker);

					return x;
				})
			);
	}

	// NEED BACKEND ROUTE/CONTROLLER AUTH??
	deleteWorker(id: string) {
		return this.http
			.delete(`${environment.API_URL}/remove-worker/${id}`, { withCredentials: true })
			.pipe(
				map((x) => {
					return x;
				})
			);
	}
}
