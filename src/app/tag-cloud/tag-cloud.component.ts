import { Component, OnInit } from '@angular/core';
import { Story } from '../models/story';
import { tagCloud } from '../models/tagCloud';
import { StoryService } from '../story-service/story.service';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.css'],
  providers: [StoryService]
})
export class TagCloudComponent implements OnInit {

  theCloud: tagCloud[];

  constructor(private storyService:StoryService) { }

  getTagCloud(): void{
    
  }

  ngOnInit() {
    this.getTagCloud();
  }

}
