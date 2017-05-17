import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Story } from '../models/story';
import { tagCloud } from '../models/tagCloud';

@Injectable()
export class StoryService {

  private storyURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  getTopStories(): Promise<Story[]> {
    return this.http.get(this.storyURL + '/stories/top')
      .toPromise()
      .then(response => response.json() as Story[])
      .catch(this.handleError);
  }

  getAllStories(): Promise<Story[]> {
    return this.http.get(this.storyURL + '/stories')
      .toPromise()
      .then(response => response.json() as Story[])
      .catch(this.handleError);
  }

  getStory(id: string): Promise<Story> {
    return this.http.get(this.storyURL + '/story/' + id)
      .toPromise()
      .then(response => response.json() as Story)
      .catch(this.handleError);
  }

  getTagCloud(): Promise<tagCloud[]> {
    // call service to get query : SELECT Videos.tags FROM Videos to get tags for all stories
    return this.http.get(this.storyURL + '/tag')
      .toPromise()
      .then(response => response.json() as tagCloud[])
      .catch(this.handleError);
  }

  postNewStory(aStory: Story): Promise<Story> {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http
      .post(this.storyURL + '/story', JSON.stringify(aStory), { headers: headers })
      .toPromise()
      .then(res => res.json() as Story)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in story service: ', error);
    return Promise.reject(error.message || error);
  }

}
