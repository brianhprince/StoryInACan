import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { StoryService } from './story-service/story.service';
import { TopStoriesComponent } from './top-stories/top-stories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FindStoryComponent } from './find-story/find-story.component';
import { ShareStoryComponent } from './share-story/share-story.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { TagCloudComponent } from './tag-cloud/tag-cloud.component';

@NgModule({
  declarations: [
    AppComponent,
    TopStoriesComponent,
    DashboardComponent,
    FindStoryComponent,
    ShareStoryComponent,
    StoryDetailsComponent,
    TagCloudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'sharestory',
        component: ShareStoryComponent
      },
      {
        path: 'findstory',
        component: FindStoryComponent
      },
      {
        path: 'storydetails/:id',
        component: StoryDetailsComponent
      }
    ])
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
