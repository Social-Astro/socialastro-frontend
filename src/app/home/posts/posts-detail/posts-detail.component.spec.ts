import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDetailComponent } from './posts-detail.component';

describe('PostsDetailComponent', () => {
  let component: PostsDetailComponent;
  let fixture: ComponentFixture<PostsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
