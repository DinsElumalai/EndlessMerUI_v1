import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpanComponent } from './rpan.component';

describe('RpanComponent', () => {
  let component: RpanComponent;
  let fixture: ComponentFixture<RpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
