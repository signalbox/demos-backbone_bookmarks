Namespace('Demo.Models');

Demo.Models.Base = Backbone.Model.extend({
  
  rawAttributes : function() {
		return Backbone.Model.prototype.toJSON.call(this);
	},
  
  toJSON : function() {
		var attributes    = this.rawAttributes(),
		    serializable  = this.serializable;
		
		_(attributes).each(function(value, key) {
			if(_.indexOf(serializable, key) == -1)
			  delete attributes[key];
		});
		
		return attributes;
	}
  
});

Demo.Models.App = Demo.Models.Base.extend({

  defaults : {
    page : null
  },
  
  signIn : function(user) {
    this.set({ user : user });
  },
  
  signOut : function() {
    this.signIn(null);
  }

});

Demo.Models.User = Demo.Models.Base.extend({
  
  defaults : {},
  
  serializable : [ 'id', 'username' ],
  
  urlRoot : '/proxy/app/users'

});

Demo.Models.Bookmark = Demo.Models.Base.extend({
  
  defaults : {},
  
  serializable : [ 'id', 'url' ],
  
  url : function() {
    var baseUrl = this.get('user').url() + '/bookmarks';
    return this.isNew() ? baseUrl : baseUrl + '/' + this.get('id');
  }

});
