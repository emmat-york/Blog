import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePhotoModalComponent } from './article-photo-modal.component';

describe('ArticlePhotoModalComponent', () => {
  let component: ArticlePhotoModalComponent;
  let fixture: ComponentFixture<ArticlePhotoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlePhotoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
