import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemtypeAddComponent } from './itemtype-add.component';

describe('ItemtypeAddComponent', () => {
  let component: ItemtypeAddComponent;
  let fixture: ComponentFixture<ItemtypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemtypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemtypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
