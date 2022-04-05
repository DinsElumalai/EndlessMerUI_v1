import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPponComponent } from './list-ppon.component';

describe('ListPponComponent', () => {
  let component: ListPponComponent;
  let fixture: ComponentFixture<ListPponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
