Demo.Models.User = Demo.Models.Base.extend({

  serializable : [ 'id', 'username' ],

  urlRoot : Demo.Config.url + 'resources/users'

});
