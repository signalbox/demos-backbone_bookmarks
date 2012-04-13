Demo.Views.NewBookmark = Demo.Views.Modal.extend({

  events : {
    'submit form'             : 'onSubmit',
    'click input[type=reset]' : 'onCancel'
  },

  initialize : function() {
    this.template = Handlebars.compile($("#new_bookmark-template").html());
  },

  onSubmit : function(e) {
    e.preventDefault();

    var location  = this.$('#location').val(),
        user      = this.model.get('user'),
        bookmarks = this.model.get('bookmarks'),
        bookmark  = new Demo.Models.Bookmark({
          location : location,
          user_id  : user.get('_id')
        });

    bookmark.save(bookmark.toJSON(), {
      wait    : true,
      success : function(model, response) {
        bookmarks.add(model);

        this.closeModal();
      }.delegate(this),
      error : function(model, response) {
        var errors = new Demo.Errors(response.responseText);

        alert(errors.toString());
      }
    });
  },

  onCancel : function() {
    this.closeModal();
  }

});
