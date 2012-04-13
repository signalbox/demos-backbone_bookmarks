Demo.Collections.UsersWithUsername = Demo.Collections.Base.extend({

  model : Demo.Models.User,

  initialize : function(models, options) {
    this.username = options.username;
  },

  url : function() {
    var query = this.buildQuery("SELECT * WHERE username = '{username}'", { username : this.username });

    return Demo.Config.url + 'resources/users?query=' + query;
  }

});
