import { Injectable } from '@angular/core';
import { Story } from './story';
import { Stories } from './mock-stories';


@Injectable()
export class StoryService {

  constructor() { }

  getTopStories() : Promise<Story[]> {
    return Promise.resolve(Stories);
  } 

  getAllStories() : Promise<Story[]> {
    return Promise.resolve(Stories);
  } 

  getStory(id: number) : Promise<Story>{
    return this.getAllStories()
             .then(stories => stories.find(story => story.id === id));
  }
  
}
