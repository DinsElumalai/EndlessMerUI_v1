import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesigaddComponent } from './desigadd.component';

describe('DesigaddComponent', () => {
  let component: DesigaddComponent;
  let fixture: ComponentFixture<DesigaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesigaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesigaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
