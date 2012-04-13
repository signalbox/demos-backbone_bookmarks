Demo.Models.User = Demo.Models.Base.extend({

  serializable : [ '_id', 'username' ],

  urlRoot : Demo.Config.url + 'resources/users'

});
