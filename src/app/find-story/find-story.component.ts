import { Component, OnInit } from '@angular/core';
import { Story } from '../models/story';
import { StoryService } from '../story-service/story.service';

@Component({
  selector: 'app-find-story',
  templateUrl: './find-story.component.html',
  styleUrls: ['./find-story.component.css'],
  providers: [StoryService]
})

export class FindStoryComponent implements OnInit {

  allStories: Story[];

  constructor(private storyService:StoryService) {
  }

  getAllStories(): void{
    this.storyService.getAllStories().then(stories => this.allStories = stories );
  }

  ngOnInit() {
    this.getAllStories();
  }

}
