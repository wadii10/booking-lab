import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOwnerComponent } from './footer-owner.component';

describe('FooterOwnerComponent', () => {
  let component: FooterOwnerComponent;
  let fixture: ComponentFixture<FooterOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
