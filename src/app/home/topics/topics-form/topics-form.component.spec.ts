import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsFormComponent } from './topics-form.component';

describe('TopicsFormComponent', () => {
  let component: TopicsFormComponent;
  let fixture: ComponentFixture<TopicsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
