import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRcrnComponent } from './list-rcrn.component';

describe('ListRcrnComponent', () => {
  let component: ListRcrnComponent;
  let fixture: ComponentFixture<ListRcrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRcrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRcrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
