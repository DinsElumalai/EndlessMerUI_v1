import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsubtypeListComponent } from './itemsubtype-list.component';

describe('ItemsubtypeListComponent', () => {
  let component: ItemsubtypeListComponent;
  let fixture: ComponentFixture<ItemsubtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsubtypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsubtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
