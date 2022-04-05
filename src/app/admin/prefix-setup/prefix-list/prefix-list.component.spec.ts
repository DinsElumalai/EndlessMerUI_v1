import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixListComponent } from './prefix-list.component';

describe('PrefixListComponent', () => {
  let component: PrefixListComponent;
  let fixture: ComponentFixture<PrefixListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefixListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefixListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
