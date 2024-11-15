import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredinputComponent } from './coloredinput.component';

describe('ColoredinputComponent', () => {
  let component: ColoredinputComponent;
  let fixture: ComponentFixture<ColoredinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoredinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoredinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
