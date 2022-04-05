import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareAddComponent } from './software-add.component';

describe('SoftwareAddComponent', () => {
  let component: SoftwareAddComponent;
  let fixture: ComponentFixture<SoftwareAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
