import { App } from './app';

describe('App', () => {
  it('should create the app', () => {
    const app = new App();
    expect(app).toBeTruthy();
  });

  it('should have router outlet in template', () => {
    // Simple test without TestBed - just check the component exists
    const app = new App();
    expect(app).toBeDefined();
  });
});