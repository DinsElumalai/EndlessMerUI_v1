import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixAddComponent } from './prefix-add.component';

describe('PrefixAddComponent', () => {
  let component: PrefixAddComponent;
  let fixture: ComponentFixture<PrefixAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefixAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefixAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
