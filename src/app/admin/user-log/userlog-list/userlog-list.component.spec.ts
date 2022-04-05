import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlogListComponent } from './userlog-list.component';

describe('UserlogListComponent', () => {
  let component: UserlogListComponent;
  let fixture: ComponentFixture<UserlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
