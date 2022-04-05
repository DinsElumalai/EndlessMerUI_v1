import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPdrnComponent } from './list-pdrn.component';

describe('ListPdrnComponent', () => {
  let component: ListPdrnComponent;
  let fixture: ComponentFixture<ListPdrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPdrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPdrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
