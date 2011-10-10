Namespace('Demo.Views');

Demo.Views.Base = Backbone.View.extend({});

Demo.Views.App = Demo.Views.Base.extend({

  el : '#container',
  
  initialize : function() {
    this.model.bind('change:page', this.render, this);
  },
  
  render : function() {
    if (this.view) {
      this.view.close();
    }
    
    var page = this.model.get('page');
    var user = this.model.get('user');
    
    // TODO: Override app toJson method
    var data = {
      page : this.model.get('page'),
      user : (user != null ? user.rawAttributes() : null),
    };
    
    // TODO: Dry up
    if (page == 'about') {
      var navTemplate = Handlebars.compile($("#nav-template").html());
      $('#nav').html(navTemplate(data));
      $('#nav').show();
      this.view = new Demo.Views.About({ model : this.model });
    }
    else if (page == 'dashboard') {
      var navTemplate = Handlebars.compile($("#nav-template").html());
      $('#nav').html(navTemplate(data));
      $('#nav').show();
      this.view = new Demo.Views.Dashboard({ model : this.model });
    }
    else {
      $('#nav').hide();
      this.view = new Demo.Views.SignIn({ model : this.model });
    }
    
    $(this.el).html(this.view.render({}).el);
    return this;
  }

});

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
    var user = new Demo.Models.User({ id : username, username : username });
    user.fetch({
      success : this.onSignInSuccess.delegate(this),
      error : this.onSignInError.delegate(this)
    });
  },
  
  onSignInSuccess : function(model, response) {
    this.model.signIn(model);
  },
  
  onSignInError : function(model, response) {
    if (response.status == 404) {
      var newUser = new Demo.Models.User();
      newUser.save({ username : model.get('username') }, {
        success : this.onSignInSuccess.delegate(this),
        error : function(model, response) {
          // TODO
        }
      });
    }
    else {
      // TODO
    }
  },
  
  onClose : function(e) {}

});

Demo.Views.Dashboard = Demo.Views.Base.extend({

  id : 'dashboard',
  
  events : {
		'click .new_bookmark' : 'onNewBookmark'
	},
  
  initialize : function() {
    this.template = Handlebars.compile($("#dashboard-template").html());
    this.bookmarks = new Demo.Collections.Bookmarks([], { user : this.model.get('user') });
    this.bookmarks.fetch();
    this.bookmarks.bind('reset', function(bookmark) {
      this.renderBookmarks();
    }, this);
    this.bookmarks.bind('add', function(bookmark) {
      this.renderBookmarks();
    }, this);
    this.newBookmarkModal = new Demo.Views.NewBookmarkModal({ 
      model : this.model.get('user')
    });
    this.newBookmarkModal.bind('onCreateBookmark', this.onCreateBookmark, this);
  },
  
  render : function() {
    $(this.el).html(this.template());
    
    return this;
  },
  
  renderBookmarks : function() {
    _(this.bookmarks.models).each(function(bookmark) {
      var view = new Demo.Views.Bookmark({
        model: bookmark
      });
      this.$('#bookmarks').append(view.render().el);
    });
  },
  
  onClose : function(e) {
    this.bookmarks.unbind();
  },
  
  onNewBookmark : function(e) {
    e.preventDefault();
    this.newBookmarkModal.render();
  },
  
  onCreateBookmark : function(model) {
    this.bookmarks.add(model);
  }

});

Demo.Views.Bookmark = Demo.Views.Base.extend({
  
  initialize : function() {
    this.template = Handlebars.compile($("#bookmark-template").html());
  },
  
  render : function() {
    $(this.el).html(this.template(this.model.rawAttributes()));
    return this;
  }
  
});

Demo.Views.About = Demo.Views.Base.extend({

  id : 'about',
  
  initialize : function() {
    this.template = Handlebars.compile($("#about-template").html());
  },
  
  render : function() {
    $(this.el).html(this.template());
    return this;
  },
  
  onClose : function(e) {}

});

Demo.Views.Modal = Demo.Views.Base.extend({
  
  className : 'modal fade',
  
  render : function() {
    $(this.el).html(this.template());
    $('body').append($(this.el));
    
    $(this.el).bind('hidden', this.close.delegate(this));
    
    $(this.el).modal({
		  backdrop : true,
			keyboard : true,
			show     : true
		});
    return this;
  },
  
  closeModal : function() {
    $(this.el).modal('hide');
  }

});

Demo.Views.NewBookmarkModal = Demo.Views.Modal.extend({
  
  events : {
		'submit form' : 'onSubmit',
		'click button[type=reset]' : 'onCancel'
	},
  
  initialize : function() {
    this.template = Handlebars.compile($("#new_bookmark_modal-template").html());
  },
  
  onSubmit : function(e) {
    e.preventDefault();
    var url = this.$('#url').val();
    if (url == '')
      return;
    
    var bookmark = new Demo.Models.Bookmark({ url : url, user : this.model });
    bookmark.save(bookmark.toJSON(), {
      success : function(model, response) {
        this.trigger('onCreateBookmark', model);
        this.closeModal();
      }.delegate(this),
      error : function(model, response) {
        // TODO:
      }
    });
  },
  
  onCancel : function() {
    this.closeModal();
  }

});