Demo.Views.Dashboard = Demo.Views.Base.extend({

  id : 'dashboard',

  events : {
    'click .new_bookmark' : 'onNewBookmark'
  },

  initialize : function() {
    this.template = Handlebars.compile($("#dashboard-template").html());

    var bookmarks = new Demo.Collections.Bookmarks([], { user_id : this.model.get('user').get('_id') });

    this.model.set({ bookmarks : bookmarks });

    bookmarks.fetch();
    bookmarks.bind('reset', function(bookmark){ this.renderBookmarks(bookmarks); }, this);
    bookmarks.bind('add', function(bookmark){ this.renderBookmarks(bookmarks); }, this);
  },

  render : function() {
    $(this.el).html(this.template());

    return this;
  },

  renderBookmarks : function(bookmarks) {
    var view = new Demo.Views.Bookmarks({ collection : bookmarks });

    this.$('#bookmarks').html(view.render().el);
  },

  onClose : function(e) {
    this.model.get('bookmarks').unbind();
    this.model.set({'bookmarks' : null});
  },

  onNewBookmark : function(e) {
    e.preventDefault();

    var newBookmark = new Demo.Views.NewBookmark({
      model : this.model
    });

    newBookmark.render();
  }

});
