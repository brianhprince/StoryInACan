import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindStoryComponent } from './find-story.component';

describe('FindStoryComponent', () => {
  let component: FindStoryComponent;
  let fixture: ComponentFixture<FindStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
