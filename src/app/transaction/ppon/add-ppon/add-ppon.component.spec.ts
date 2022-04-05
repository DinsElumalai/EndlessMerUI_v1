import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPponComponent } from './add-ppon.component';

describe('AddPponComponent', () => {
  let component: AddPponComponent;
  let fixture: ComponentFixture<AddPponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
