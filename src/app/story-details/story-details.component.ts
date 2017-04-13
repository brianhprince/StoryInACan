import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Story } from '../story';
import { StoryService } from '../story.service';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchmap';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {

  theStory: Story;

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit():void {
    this.route.params.switchMap((params: Params)=>
      this.storyService.getStory(+params['id'])).subscribe(story => this.theStory=story);
  }

}
