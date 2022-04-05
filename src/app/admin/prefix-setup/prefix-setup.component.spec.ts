import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixSetupComponent } from './prefix-setup.component';

describe('PrefixSetupComponent', () => {
  let component: PrefixSetupComponent;
  let fixture: ComponentFixture<PrefixSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefixSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefixSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
