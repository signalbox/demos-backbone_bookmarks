Namespace('Demo');

Demo.Router = Backbone.Router.extend({

  routes : {
    ''          : 'dashboard',
    'sign-in'   : 'signIn',
    'sign-out'  : 'signOut',
    'dashboard' : 'dashboard',
    'about'     : 'about'
  },

  // TODO: Before filter
  // Boot to sign in if not logged in

  initialize : function(app) {
    this.app = app;
    this.app.bind('change:user', function(app, user) {
      var page = user != null ? 'dashboard' : 'sign-in';
      this.app.set({ page : page });
      this.navigate(page);
    }.delegate(this));
  },

  signIn : function() {
    this.app.set({ page : 'sign-in' });
  },
  
  signOut : function() {
    this.app.signOut();
  },

  dashboard : function() {
    this.app.set({ page : 'dashboard' });
  },
  
  about : function() {
    this.app.set({ page : 'about' });
  }

});
