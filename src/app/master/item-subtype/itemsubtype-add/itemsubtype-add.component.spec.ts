import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsubtypeAddComponent } from './itemsubtype-add.component';

describe('ItemsubtypeAddComponent', () => {
  let component: ItemsubtypeAddComponent;
  let fixture: ComponentFixture<ItemsubtypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsubtypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsubtypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
