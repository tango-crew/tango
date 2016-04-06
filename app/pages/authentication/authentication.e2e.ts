import { AuthenticatePage } from './authentication.page.e2e';

let page:AuthenticatePage = new AuthenticatePage();

describe('Authentication Page', () => {
  beforeEach(() => {
    page.visit();
  });

  it('should sign in the user', (done) => {
    page.signIn('test@tango.com', '123');

    page.wait()
      .then(() => {
        page.currentTitle().then((value) => {
            if (value === 'Meu Perfil') {
              done();
            } else {
              done.fail(`${value.toString()} === Meu Perfil`);
            }
        });
      });
  });

  it('should sign out the user', () => {
    page.signOut();

    expect(element(by.css('ion-navbar ion-title')).getText()).toEqual('Seja bem vindo!');
  });
});
