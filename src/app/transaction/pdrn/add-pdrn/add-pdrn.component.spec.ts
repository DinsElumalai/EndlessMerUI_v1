import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPdrnComponent } from './add-pdrn.component';

describe('AddPdrnComponent', () => {
  let component: AddPdrnComponent;
  let fixture: ComponentFixture<AddPdrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPdrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPdrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
