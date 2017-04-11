import { StoryInACanPage } from './app.po';

describe('story-in-acan App', () => {
  let page: StoryInACanPage;

  beforeEach(() => {
    page = new StoryInACanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
