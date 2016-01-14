/* global chai */
/* global sinon */
/* global describe */
/* global it */

import { isFSA } from 'flux-standard-action';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import actions from '../../../../app/redux/actions/index';

import initialState from '../../../../app/redux/reducers/initialState';

describe('Actions', () => {
  const mockStore = configureStore([thunk]);

  describe('Asyncronous Actions', () => {
    describe('signup', (done) => {
      it('should trigger SIGNUP_SUCCESS and it should call signup and get once for a successful request', () => {
        let user = { id: 27 };
        let api = {
          user: {
            signup: sinon.stub().callsArgWith(1, null, 'success!'),
            get: sinon.stub().callsArgWith(0, null, user)
          }
        };

        let expectedActions = [
          { type: 'SIGNUP_REQUEST' },
          { type: 'SIGNUP_SUCCESS', payload: { user: { id: 27 } } }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.signup(api, {foo: 'bar'}));

        expect(api.user.signup.callCount).to.equal(1);
        expect(api.user.get.callCount).to.equal(1);
      });

      it('should trigger SIGNUP_FAILURE and it should call signup once and get zero times for a failed signup request', () => {
        let user = { id: 27 };
        let api = {
          user: {
            signup: sinon.stub().callsArgWith(1, 'fail!', null),
            get: sinon.stub()
          }
        };

        let expectedActions = [
          { type: 'SIGNUP_REQUEST' },
          { type: 'SIGNUP_FAILURE', error: 'fail!' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.signup(api, {foo: 'bar'}));

        expect(api.user.signup.callCount).to.equal(1);
        expect(api.user.get.callCount).to.equal(0);
      });

      it('should trigger SIGNUP_FAILURE and it should call signup and get once for a failed user retrieval', () => {
        let user = { id: 27 };
        let api = {
          user: {
            signup: sinon.stub().callsArgWith(1, null, 'success!'),
            get: sinon.stub().callsArgWith(0, 'failed user retrieval!', null)
          }
        };

        let expectedActions = [
          { type: 'SIGNUP_REQUEST' },
          { type: 'SIGNUP_FAILURE', error: 'failed user retrieval!' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.signup(api, {foo: 'bar'}));

        expect(api.user.signup.callCount).to.equal(1);
        expect(api.user.get.callCount).to.equal(1);
      });
    });

    describe('confirmSignup', () => {
      it('should trigger CONFIRM_SIGNUP_SUCCESS and it should call confirmSignup once for a successful request', (done) => {
        let user = { id: 27 };
        let api = {
          user: {
            confirmSignup: sinon.stub().callsArgWith(1, null)
          }
        };

        let expectedActions = [
          { type: 'CONFIRM_SIGNUP_REQUEST' },
          { type: 'CONFIRM_SIGNUP_SUCCESS' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.confirmSignup(api, 'fakeSignupKey'));

        expect(api.user.confirmSignup.calledWith('fakeSignupKey').callCount).to.equal(1);
      });

      it('should trigger CONFIRM_SIGNUP_FAILURE and it should call confirmSignup once for a failed request', (done) => {
        let user = { id: 27 };
        let api = {
          user: {
            confirmSignup: sinon.stub().callsArgWith(1, 'Failure!')
          }
        };

        let expectedActions = [
          { type: 'CONFIRM_SIGNUP_REQUEST' },
          { type: 'CONFIRM_SIGNUP_FAILURE', error: 'Failure!' }
        ];

        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.confirmSignup(api, 'fakeSignupKey'));

        expect(api.user.confirmSignup.calledWith('fakeSignupKey').callCount).to.equal(1);
      });
    });

    describe('login', () => {
      it('should trigger LOGIN_SUCCESS and it should call login and user.get once for a successful request', (done) => {
        let creds = { username: 'bruce', password: 'wayne' };
        let user = { id: 27 };
        let api = {
          user: {
            login: sinon.stub().callsArgWith(2, null),
            get: sinon.stub().callsArgWith(0, null, user)
          }
        };

        let expectedActions = [
          { type: 'LOGIN_REQUEST' },
          { type: 'LOGIN_SUCCESS', payload: { user: user } }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.login(api, creds));

        expect(api.user.login.calledWith(creds).callCount).to.equal(1);
        expect(api.user.get.callCount).to.equal(1);
      });

      it('should trigger LOGIN_FAILURE and it should call login once and user.get zero times for a failed login request', (done) => {
        let creds = { username: 'bruce', password: 'wayne' };
        let user = { id: 27 };
        let api = {
          user: {
            login: sinon.stub().callsArgWith(2, 'failed!'),
            get: sinon.stub()
          }
        };

        let expectedActions = [
          { type: 'LOGIN_REQUEST' },
          { type: 'LOGIN_FAILURE', error: 'failed!' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.login(api, creds));

        expect(api.user.login.calledWith(creds).callCount).to.equal(1);
        expect(api.user.get.callCount).to.equal(0);
      });

      it('should trigger LOGIN_FAILURE and it should call login and user.get once for a failed user.get request', (done) => {
        let creds = { username: 'bruce', password: 'wayne' };
        let user = { id: 27 };
        let api = {
          user: {
            login: sinon.stub().callsArgWith(2, null),
            get: sinon.stub().callsArgWith(0, 'failed!')
          }
        };

        let expectedActions = [
          { type: 'LOGIN_REQUEST' },
          { type: 'LOGIN_FAILURE', error: 'failed!' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.login(api, creds));

        expect(api.user.login.calledWith(creds).callCount).to.equal(1);
        expect(api.user.get.callCount).to.equal(1);
      });
    });

    describe('logout', () => {
      it('should trigger LOGOUT_SUCCESS and it should call logout once for a successful request', (done) => {
        let api = {
          user: {
            logout: sinon.stub().callsArgWith(0, null)
          }
        };

        let expectedActions = [
          { type: 'LOGOUT_REQUEST' },
          { type: 'LOGOUT_SUCCESS' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.logout(api));

        expect(api.user.logout.callCount).to.equal(1);
      });

      it('should trigger LOGOUT_FAILURE and it should call logout once for a failed request', (done) => {
        let api = {
          user: {
            logout: sinon.stub().callsArgWith(0, 'this thing failed!')
          }
        };

        let expectedActions = [
          { type: 'LOGOUT_REQUEST' },
          { type: 'LOGOUT_FAILURE', error: 'this thing failed!' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.logout(api));

        expect(api.user.logout.callCount).to.equal(1);
      });
    });

    describe('logApiError', () => {
      it('should trigger LOG_ERROR_SUCCESS and it should call error once for a successful request', (done) => {
        let error = 'Error';
        let message = 'Some random detailed error message!';
        let props = { 
          stacktrace: true
        };

        let api = {
          errors: {
            log: sinon.stub().callsArgWith(3, null)
          }
        };

        let expectedActions = [
          { type: 'LOG_ERROR_REQUEST' },
          { type: 'LOG_ERROR_SUCCESS' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.logError(api, error, message, props));

        expect(api.errors.log.withArgs(error, message, props)).to.equal(1);
      });

      it('should trigger LOG_ERROR_FAILURE and it should call error once for a failed request', (done) => {
        let error = 'Error';
        let message = 'Another random detailed error message!';
        let props = { 
          stacktrace: true
        };

        let api = {
          errors: {
            log: sinon.stub().callsArgWith(3, 'This totally messed up!')
          }
        };

        let expectedActions = [
          { type: 'LOG_ERROR_REQUEST' },
          { type: 'LOG_ERROR_FAILURE', error: 'This totally messed up!' }
        ];
        let store = mockStore(initialState, expectedActions, done);

        store.dispatch(actions.async.logError(api, error, message, props));

        expect(api.errors.log.withArgs(error, message, props)).to.equal(1);
      });
    });
  });


  describe('Syncronous Actions', () => {
    describe('showWelcomeMessage', () => {
      it('should be a FSA', () => {
        let action = actions.sync.showWelcomeMessage();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal SHOW_WELCOME_MESSAGE', () => {
        let action = actions.sync.showWelcomeMessage();
        expect(action.type).to.equal('SHOW_WELCOME_MESSAGE');
      });
    });

    describe('hideWelcomeMessage', () => {
      it('should be a FSA', () => {
        let action = actions.sync.hideWelcomeMessage();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal HIDE_WELCOME_MESSAGE', () => {
        let action = actions.sync.hideWelcomeMessage();
        expect(action.type).to.equal('HIDE_WELCOME_MESSAGE');
      });
    });

    describe('showNotification', () => {
      it('should be a FSA', () => {
        let action = actions.sync.showNotification('Fake notification');

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal SHOW_NOTIFICATION', () => {
        let action = actions.sync.showNotification();
        expect(action.type).to.equal('SHOW_NOTIFICATION');
      });
    });

    describe('closeNotification', () => {
      it('should be a FSA', () => {
        let action = actions.sync.closeNotification();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal CLOSE_NOTIFICATION', () => {
        let action = actions.sync.closeNotification();
        expect(action.type).to.equal('CLOSE_NOTIFICATION');
      });
    });

    describe('loginRequest', () => {
      it('should be a FSA', () => {
        let action = actions.sync.loginRequest();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOGIN_REQUEST', () => {
        let action = actions.sync.loginRequest();
        expect(action.type).to.equal('LOGIN_REQUEST');
      });
    });

    describe('loginSuccess', () => {
      it('should be a FSA', () => {
        let user = { id: 27, name: 'Frankie' };
        let action = actions.sync.loginSuccess(user);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOGIN_SUCCESS and payload should contain user', () => {
        let user = { id: 27, name: 'Frankie' };
        let action = actions.sync.loginSuccess(user);

        expect(action.type).to.equal('LOGIN_SUCCESS');
        expect(action.payload.user).to.equal(user);
      });
    });

    describe('loginFailure', () => {
      it('should be a FSA', () => {
        let error = 'Error';
        let action = actions.sync.loginFailure(error);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOGIN_FAILURE and error should equal passed error', () => {
        let error = 'Error';
        let action = actions.sync.loginFailure(error);

        expect(action.type).to.equal('LOGIN_FAILURE');
        expect(action.error).to.equal(error);
      });
    });

    describe('logoutRequest', () => {
      it('should be a FSA', () => {
        let action = actions.sync.logoutRequest();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOGOUT_REQUEST', () => {
        let action = actions.sync.logoutRequest();
        expect(action.type).to.equal('LOGOUT_REQUEST');
      });
    });

    describe('logoutSuccess', () => {
      it('should be a FSA', () => {
        let user = { id: 27, name: 'Frankie' };
        let action = actions.sync.logoutSuccess(user);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOGOUT_SUCCESS', () => {
        let action = actions.sync.logoutSuccess();

        expect(action.type).to.equal('LOGOUT_SUCCESS');
      });
    });

    describe('logoutFailure', () => {
      it('should be a FSA', () => {
        let error = 'Error';
        let action = actions.sync.logoutFailure(error);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOGOUT_FAILURE and error should equal passed error', () => {
        let error = 'Error';
        let action = actions.sync.logoutFailure(error);

        expect(action.type).to.equal('LOGOUT_FAILURE');
        expect(action.error).to.equal(error);
      });
    });

    describe('signupRequest', () => {
      it('should be a FSA', () => {
        let action = actions.sync.signupRequest();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal SIGNUP_REQUEST', () => {
        let action = actions.sync.signupRequest();
        expect(action.type).to.equal('SIGNUP_REQUEST');
      });
    });

    describe('signupSuccess', () => {
      it('should be a FSA', () => {
        let user = { id: 27, name: 'Frankie' };
        let action = actions.sync.signupSuccess(user);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal SIGNUP_SUCCESS and payload should contain user', () => {
        let user = { id: 27, name: 'Frankie' };
        let action = actions.sync.signupSuccess(user);

        expect(action.type).to.equal('SIGNUP_SUCCESS');
        expect(action.payload.user).to.equal(user);
      });
    });

    describe('signupFailure', () => {
      it('should be a FSA', () => {
        let error = 'Error';
        let action = actions.sync.signupFailure(error);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal SIGNUP_FAILURE and error should equal passed error', () => {
        let error = 'Error';
        let action = actions.sync.signupFailure(error);

        expect(action.type).to.equal('SIGNUP_FAILURE');
        expect(action.error).to.equal(error);
      });
    });

    describe('confirmSignupRequest', () => {
      it('should be a FSA', () => {
        let action = actions.sync.confirmSignupRequest();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal CONFIRM_SIGNUP_REQUEST', () => {
        let action = actions.sync.confirmSignupRequest();
        expect(action.type).to.equal('CONFIRM_SIGNUP_REQUEST');
      });
    });

    describe('confirmSignupSuccess', () => {
      it('should be a FSA', () => {
        let user = { id: 27, name: 'Frankie' };
        let action = actions.sync.confirmSignupSuccess(user);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal CONFIRM_SIGNUP_SUCCESS', () => {
        let action = actions.sync.confirmSignupSuccess();

        expect(action.type).to.equal('CONFIRM_SIGNUP_SUCCESS');
      });
    });

    describe('confirmSignupFailure', () => {
      it('should be a FSA', () => {
        let error = 'Error';
        let action = actions.sync.confirmSignupFailure(error);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal CONFIRM_SIGNUP_FAILURE and error should equal passed error', () => {
        let error = 'Error';
        let action = actions.sync.confirmSignupFailure(error);

        expect(action.type).to.equal('CONFIRM_SIGNUP_FAILURE');
        expect(action.error).to.equal(error);
      });
    });

    describe('logErrorRequest', () => {
      it('should be a FSA', () => {
        let action = actions.sync.logErrorRequest();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOG_ERROR_REQUEST', () => {
        let action = actions.sync.logErrorRequest();
        expect(action.type).to.equal('LOG_ERROR_REQUEST');
      });
    });

    describe('logErrorSuccess', () => {
      it('should be a FSA', () => {
        let action = actions.sync.logErrorSuccess();

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOG_ERROR_SUCCESS', () => {
        let action = actions.sync.logErrorSuccess();

        expect(action.type).to.equal('LOG_ERROR_SUCCESS');
      });
    });

    describe('logErrorFailure', () => {
      it('should be a FSA', () => {
        let error = 'Error';
        let action = actions.sync.logErrorFailure(error);

        expect(isFSA(action)).to.be.true;
      });

      it('type should equal LOG_ERROR_FAILURE and error should equal passed error', () => {
        let error = 'Error';
        let action = actions.sync.logErrorFailure(error);

        expect(action.type).to.equal('LOG_ERROR_FAILURE');
        expect(action.error).to.equal(error);
      });
    });
  });
});