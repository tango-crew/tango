import {User} from '../../app/models/user';

describe('User', () => {
  describe('#avatar', () => {

    describe('when it is a facebook integration', () => {
      var user = new User();
      user.integration_type = 1;
      user.integration_id = 2;

      it('returns a facebook url', function() {
        expect(user.avatar()).toMatch(/graph\.facebook\.com\/2/);
      });
    });
  });
});
