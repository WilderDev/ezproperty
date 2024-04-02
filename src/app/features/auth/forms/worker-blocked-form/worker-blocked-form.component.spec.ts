import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerBlockedFormComponent } from './worker-blocked-form.component';

describe('WorkerBlockedFormComponent', () => {
  let component: WorkerBlockedFormComponent;
  let fixture: ComponentFixture<WorkerBlockedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerBlockedFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerBlockedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
