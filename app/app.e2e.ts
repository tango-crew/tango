describe('TangoApp', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Seja bem vindo!');
  });

  it('should have <nav>', () => {
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
  });
});
