import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMaintenanceComponent } from './register-maintenance.component';

describe('RegisterMaintenanceComponent', () => {
  let component: RegisterMaintenanceComponent;
  let fixture: ComponentFixture<RegisterMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
