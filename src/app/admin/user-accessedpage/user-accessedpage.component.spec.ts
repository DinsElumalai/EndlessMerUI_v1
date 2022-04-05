import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessedpageComponent } from './user-accessedpage.component';

describe('UserAccessedpageComponent', () => {
  let component: UserAccessedpageComponent;
  let fixture: ComponentFixture<UserAccessedpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessedpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
