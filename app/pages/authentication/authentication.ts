import {Page, NavController, Events} from 'ionic-framework/ionic';
import {FacebookService} from '../../services/facebook'
import {UsersService} from '../../services/users'
import {SignUpPage} from '../signup/signup'

@Page({
  templateUrl: 'build/pages/authentication/authentication.html'
})
export class AuthenticationPage {
  constructor(private events:Events,
              private facebookService:FacebookService,
              private users:UsersService,
              private nav:NavController) {}

  signup() {
    this.nav.push(SignUpPage);
  }

  login() {
    this.facebookService
      .login()
      .then(
        () => this.getFacebookUser(),
        (error) => alert(`Erro ao autenticar usuário com o Facebook: ${JSON.stringify(error)}`)
      );
  }

  getFacebookUser() {
    this.facebookService
      .user()
      .then(
        (user) => this.verifyIfUserExistsOnApi(user),
        (error) => alert(`Erro ao obter usuário do Facebook: ${JSON.stringify(error)}`)
      );
  }

  verifyIfUserExistsOnApi(user) {
    let userFromFacebook = (u) => u.integration_type === 1 && u.integration_id === user.id;

    this.users
      .all()
      .subscribe(
        (response) => {
          let userFromApi = response.users.find(userFromFacebook);

          if (!userFromApi) {
            this.signUpUser(user);
          } else {
            this.notifyWith(userFromApi);
          }
        },
        (error) => alert(`erro ao buscar usuários: ${JSON.stringify(error)}`)
      );
  }

  signUpUser(user) {
    this.users
      .create(
        {
          "user": {
            "name": user.name,
            "email": user.email,
            "integration_type": 1,
            "integration_id": user.id
          }
        }
      )
      .subscribe(
        (response) => this.notifyWith(response.user),
        (error) => alert(`erro ao criar o usuário: ${JSON.stringify(error)}`)
      );
  }

  notifyWith(user) {
    this.events.publish('user:authenticated', user);
  }
}
