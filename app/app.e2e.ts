describe('TangoApp', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have correct nav text for Authentication Page', () => {
    expect(element(by.css('ion-navbar ion-title')).getText()).toEqual('Seja bem vindo!');
  });
});
