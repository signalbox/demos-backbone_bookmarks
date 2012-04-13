Demo.Views.SignIn = Demo.Views.Base.extend({

  id : 'sign_in',

  events : {
    'submit form' : 'onSubmit'
  },

  initialize : function() {
    this.template = Handlebars.compile($("#sign_in-template").html());
  },

  render : function() {
    $(this.el).html(this.template());

    return this;
  },

  onSubmit : function(e) {
    e.preventDefault();

    var username = $('form #username').val();
    var users    = new Demo.Collections.UsersWithUsername([], { username : username });

    users.fetch({
      success : function(model, response) {
        if(users.length > 0){
          this.model.signIn(users.at(0));
        }
        else {
          this.createNewUser(username);
        }
      }.delegate(this),
      error : function(model, response) {
        alert('Please enter a username (a user will be created for you).');
      }
    });
  },

  createNewUser : function(username) {
    var user = new Demo.Models.User();

    user.save({ username : username }, {
      wait    : true,
      success : this.onSignInSuccess.delegate(this),
      error   : function(model, response){
        alert('Please enter a username (one will be created for you)');
      }
    });
  },

  onSignInSuccess : function(model, response) {
    this.model.signIn(model);
  }

});
