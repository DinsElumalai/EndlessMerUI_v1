import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PponComponent } from './ppon.component';

describe('PponComponent', () => {
  let component: PponComponent;
  let fixture: ComponentFixture<PponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
