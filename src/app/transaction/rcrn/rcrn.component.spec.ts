import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcrnComponent } from './rcrn.component';

describe('RcrnComponent', () => {
  let component: RcrnComponent;
  let fixture: ComponentFixture<RcrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
