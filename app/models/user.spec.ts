import {it, describe, expect} from 'angular2/testing';
import {User} from './user';

export function main(): void {
  'use strict';
  
  describe('User', () => {
    describe('#avatar', () => {
      describe('when it is a facebook integration', () => {
        let user = new User();
        user.integration_type = 1;
        user.integration_id = '234';

        it('returns a facebook url', function() {
          expect(user.avatar()).toMatch(/graph\.facebook\.com\/234/);
        });
      });

      describe('when it is not an integration', () => {
        it('returns an avatar image path', function() {
          let user = new User();
          expect(user.avatar()).toEqual('img/avatar.png');
        });
      });
    });
  });
}
