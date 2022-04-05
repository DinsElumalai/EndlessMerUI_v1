import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdrnComponent } from './pdrn.component';

describe('PdrnComponent', () => {
  let component: PdrnComponent;
  let fixture: ComponentFixture<PdrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
