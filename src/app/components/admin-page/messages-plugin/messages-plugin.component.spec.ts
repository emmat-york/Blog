import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesPluginComponent } from './messages-plugin.component';

describe('MessagesPluginComponent', () => {
  let component: MessagesPluginComponent;
  let fixture: ComponentFixture<MessagesPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesPluginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
