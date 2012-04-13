Namespace('Demo');

Demo.Router = Backbone.Router.extend({

  routes : {
    ''          : 'signIn',
    'sign-in'   : 'signIn',
    'sign-out'  : 'signOut',
    'dashboard' : 'dashboard',
    'about'     : 'about'
  },

  // TODO: Save user to session.
  // TODO: Implement a before filter to boot out any users without a session.

  initialize : function(app) {
    this.app = app;
    this.app.bind('change:user', this.onUserChanged, this);
  },

  signIn : function() {
    this.app.set({ page : 'sign-in' });
  },

  signOut : function() {
    this.app.signOut();
  },

  dashboard : function() {
    if(!this.app.isSignedIn()){
      this.navigate('sign-in');

      return;
    }

    this.app.set({ page : 'dashboard' });
  },

  about : function() {
    this.app.set({ page : 'about' });
  },

  onUserChanged : function(app, user) {
    var page = user != null ? 'dashboard' : 'sign-in';

    this.app.set({ page : page });
    this.navigate(page);
  }

});
