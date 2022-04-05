import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserperListComponent } from './userper-list.component';

describe('UserperListComponent', () => {
  let component: UserperListComponent;
  let fixture: ComponentFixture<UserperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserperListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
