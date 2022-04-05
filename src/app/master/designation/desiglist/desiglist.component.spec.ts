import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiglistComponent } from './desiglist.component';

describe('DesiglistComponent', () => {
  let component: DesiglistComponent;
  let fixture: ComponentFixture<DesiglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesiglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
