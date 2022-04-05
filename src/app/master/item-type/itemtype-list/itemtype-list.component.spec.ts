import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemtypeListComponent } from './itemtype-list.component';

describe('ItemtypeListComponent', () => {
  let component: ItemtypeListComponent;
  let fixture: ComponentFixture<ItemtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemtypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
