import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubtypeComponent } from './item-subtype.component';

describe('ItemSubtypeComponent', () => {
  let component: ItemSubtypeComponent;
  let fixture: ComponentFixture<ItemSubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSubtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
