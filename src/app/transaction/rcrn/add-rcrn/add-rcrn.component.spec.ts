import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRcrnComponent } from './add-rcrn.component';

describe('AddRcrnComponent', () => {
  let component: AddRcrnComponent;
  let fixture: ComponentFixture<AddRcrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRcrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRcrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
