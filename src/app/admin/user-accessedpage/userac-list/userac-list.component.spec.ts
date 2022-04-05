import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseracListComponent } from './userac-list.component';

describe('UseracListComponent', () => {
  let component: UseracListComponent;
  let fixture: ComponentFixture<UseracListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseracListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseracListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
