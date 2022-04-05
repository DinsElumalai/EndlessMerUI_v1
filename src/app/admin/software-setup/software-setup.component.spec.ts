import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSetupComponent } from './software-setup.component';

describe('SoftwareSetupComponent', () => {
  let component: SoftwareSetupComponent;
  let fixture: ComponentFixture<SoftwareSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
