import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveArticleModalComponent } from './remove-article-modal.component';

describe('RemoveArticleModalComponent', () => {
  let component: RemoveArticleModalComponent;
  let fixture: ComponentFixture<RemoveArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveArticleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
