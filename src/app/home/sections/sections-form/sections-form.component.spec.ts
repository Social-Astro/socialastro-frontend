import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsFormComponent } from './sections-form.component';

describe('SectionsFormComponent', () => {
  let component: SectionsFormComponent;
  let fixture: ComponentFixture<SectionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
