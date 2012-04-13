Demo.Views.Bookmarks = Demo.Views.Base.extend({

  initialize : function() {
    this.template = Handlebars.compile($("#bookmarks-template").html());
  },

  render : function() {
    $(this.el).html(this.template({ bookmarks : this.collection.rawAttributes() }));

    return this;
  }

});
