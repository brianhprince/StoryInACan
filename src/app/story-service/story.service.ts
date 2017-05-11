import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Story } from '../models/story';
import { tagCloud } from '../models/tagCloud';


@Injectable()
export class StoryService {

  private storyURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  getTopStories() : Promise<Story[]> {
    return this.http.get(this.storyURL+'/stories/top')
               .toPromise()
               .then(response => response.json() as Story[])
               .catch(this.handleError);
  } 

  getAllStories() : Promise<Story[]> {
    return this.http.get(this.storyURL+'/stories')
               .toPromise()
               .then(response => response.json() as Story[])
               .catch(this.handleError);
  } 

  getStory(id: number) : Promise<Story>{
    return this.http.get(this.storyURL+'/story/'+id)
               .toPromise()
               .then(response => response.json() as Story)
               .catch(this.handleError);
  }

  getTagCloud() : Promise<tagCloud[]>{
      // call service to get query : SELECT Videos.tags FROM Videos to get tags for all stories
    return this.http.get(this.storyURL+'/tag')
          .toPromise()
          .then(response => response.json() as tagCloud[])
          .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
  
}
