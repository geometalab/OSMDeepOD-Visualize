import { VisualizingDetectionPage } from './app.po';

describe('visualizing-detection App', function() {
  let page: VisualizingDetectionPage;

  beforeEach(() => {
    page = new VisualizingDetectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
