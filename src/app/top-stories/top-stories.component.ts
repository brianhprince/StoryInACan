import { Component, OnInit } from '@angular/core';
import { Story } from '../models/story';
import { StoryService } from '../story-service/story.service';

@Component({
  selector: 'top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.css'],
  providers: [StoryService]
})

export class TopStoriesComponent implements OnInit {

  topStories: Story[];

  constructor(private storyService:StoryService) {
   }

  getTopStories(): void{
    this.storyService.getTopStories().then(stories => this.topStories = stories );
  }

  ngOnInit() {
    this.getTopStories();
  }


}
