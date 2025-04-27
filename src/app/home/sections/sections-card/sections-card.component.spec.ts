import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsCardComponent } from './sections-card.component';

describe('SectionsCardComponent', () => {
  let component: SectionsCardComponent;
  let fixture: ComponentFixture<SectionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
