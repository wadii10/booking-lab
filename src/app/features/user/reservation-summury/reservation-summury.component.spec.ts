import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSummuryComponent } from './reservation-summury.component';

describe('ReservationSummuryComponent', () => {
  let component: ReservationSummuryComponent;
  let fixture: ComponentFixture<ReservationSummuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSummuryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationSummuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
