import { AngularCliGhpagesAppPage } from './app.po';

describe('angular-cli-ghpages-app App', () => {
  let page: AngularCliGhpagesAppPage;

  beforeEach(() => {
    page = new AngularCliGhpagesAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
