import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRpanComponent } from './add-rpan.component';

describe('AddRpanComponent', () => {
  let component: AddRpanComponent;
  let fixture: ComponentFixture<AddRpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
