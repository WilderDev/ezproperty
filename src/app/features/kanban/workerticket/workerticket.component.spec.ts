import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerticketComponent } from './workerticket.component';

describe('WorkerticketComponent', () => {
  let component: WorkerticketComponent;
  let fixture: ComponentFixture<WorkerticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
