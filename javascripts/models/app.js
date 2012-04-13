Demo.Models.App = Demo.Models.Base.extend({

  defaults : {
    page : null
  },

  signIn : function(user){
    this.set({ user : user });
  },

  signOut : function(){
    this.signIn(null);
  },

  isSignedIn : function(){
    return this.get('user') !== null;
  },

  run : function(){
    Backbone.history.start({ pushState : false });
  },

  toJSON : function(){
    var page = this.get('page');
    var user = this.get('user');

    return {
      page : page,
      user : (user !== null ? user.rawAttributes() : null),
    };
  }

});
