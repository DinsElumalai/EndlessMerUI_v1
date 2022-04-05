import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserperAddComponent } from './userper-add.component';

describe('UserperAddComponent', () => {
  let component: UserperAddComponent;
  let fixture: ComponentFixture<UserperAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserperAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserperAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
