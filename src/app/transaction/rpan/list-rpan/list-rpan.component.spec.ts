import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRpanComponent } from './list-rpan.component';

describe('ListRpanComponent', () => {
  let component: ListRpanComponent;
  let fixture: ComponentFixture<ListRpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
