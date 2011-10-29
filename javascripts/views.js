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
    
    this.renderNav();
    this.renderPage();

    return this;
  },
  
  renderNav : function() {
    var template = Handlebars.compile($("#nav-template").html());
    $('#nav').html(template(this.model.toJSON()));
    $('#nav').show();
  },
  
  renderPage : function() {
    var page        = this.model.get('page'),
        ViewFactory = null;

    if (page == 'about') {
      ViewFactory = Demo.Views.About;
    }
    else if (page == 'dashboard') {
      ViewFactory = Demo.Views.Dashboard;
    }
    else {
      ViewFactory = Demo.Views.SignIn;
    }
    
    this.view = new ViewFactory({ model : this.model });
    $(this.el).html(this.view.render({}).el);
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
    var users = new Demo.Collections.UsersWithUsername([], { username : username });
    users.fetch({
      success : function(model, response) {
        if (users.length > 0) {
          this.model.signIn(users.at(0));
        }
        else {
          this.createNewUser(username);
        }
      }.delegate(this),
      error : function(model, response) {
        // TODO:
      }
    });
  },
  
  createNewUser : function(username) {
    var newUser = new Demo.Models.User();
    newUser.save({ username : username }, {
      success : this.onSignInSuccess.delegate(this),
      error : function(model, response) {
        // TODO:
      }
    });
  },
  
  onSignInSuccess : function(model, response) {
    this.model.signIn(model);
  }

});

Demo.Views.Dashboard = Demo.Views.Base.extend({

  id : 'dashboard',
  
  events : {
		'click .new_bookmark' : 'onNewBookmark'
	},
  
  initialize : function() {
    this.template = Handlebars.compile($("#dashboard-template").html());
    
    var bookmarks = new Demo.Collections.Bookmarks([], { user_id : this.model.get('user').id });
    this.model.set({ bookmarks : bookmarks });
    bookmarks.fetch();
    bookmarks.bind('reset', function(bookmark) {
      this.renderBookmarks(bookmarks);
    }, this);
    bookmarks.bind('add', function(bookmark) {
      this.renderBookmarks(bookmarks);
    }, this);
  },
  
  render : function() {
    $(this.el).html(this.template());
    
    return this;
  },
  
  renderBookmarks : function(bookmarks) {
    $('#bookmarks').empty();
    _(bookmarks.models).each(function(bookmark) {
      var view = new Demo.Views.Bookmark({ model: bookmark });
      this.$('#bookmarks').append(view.render().el);
    });
  },
  
  onClose : function(e) {
    this.model.get('bookmarks').unbind();
    this.model.set({'bookmarks' : null});
  },
  
  onNewBookmark : function(e) {
    e.preventDefault();
    var newBookmarkModal = new Demo.Views.NewBookmarkModal({ 
      model : this.model
    });
    newBookmarkModal.render();
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
    this.trigger('onCloseModal');
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
    var location = this.$('#location').val();
    if (location == '')
      return;
    
    var user        = this.model.get('user'),
        bookmarks   = this.model.get('bookmarks'),
        newBookmark = new Demo.Models.Bookmark({ location : location, user_id : user.id });
    
    newBookmark.save(newBookmark.toJSON(), {
      success : function(model, response) {
        bookmarks.add(model);
        this.closeModal();
      }.delegate(this),
      error : function(model, response) {
        // TODO:
        alert(response.responseText);
      }
    });
  },
  
  onCancel : function() {
    this.closeModal();
  }

});