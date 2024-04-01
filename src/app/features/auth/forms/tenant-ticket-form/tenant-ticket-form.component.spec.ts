import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { TenantTicketFormComponent } from "./tenant-ticket-form.component";

describe("TenantTicketFormComponent", () => {
	let component: TenantTicketFormComponent;
	let fixture: ComponentFixture<TenantTicketFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TenantTicketFormComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TenantTicketFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
