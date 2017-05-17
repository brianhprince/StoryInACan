import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Story } from '../models/story';
import { StoryService } from '../story-service/story.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
/// <reference path="..\..\assets\AzureMediaPlayer\azuremediaplayer.d.ts" />

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit, OnDestroy {

  theStory: Story;

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    var myPlayer = amp('vid1',
      { /* Options */
        techOrder: ["azureHtml5JS", "flashSS", "html5FairPlayHLS", "silverlightSS", "html5"],
        autoplay: true,
        logo: false,
        controls: true
      }, function () {
      }
    );

    this.route.params
      .switchMap((params: Params) => this.storyService.getStory(params['id']))
      .subscribe(aStory => {
        this.theStory = aStory;
        
        if (this.theStory.videoURL) {
          myPlayer.src({
            src: this.theStory.videoURL,
            type: "application/vnd.ms-sstr+xml"
          });
        }
        else console.log("no videourl");
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    amp("vid1").dispose();
  }
}
