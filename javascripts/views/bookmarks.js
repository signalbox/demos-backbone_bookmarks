Demo.Views.Bookmarks = Demo.Views.Base.extend({

  events : {
    'click a.destroyBookmark' : 'destroyBookmark'
  },

  initialize : function() {
    this.template = Handlebars.compile($("#bookmarks-template").html());
  },

  render : function() {
    $(this.el).html(this.template({ bookmarks : this.collection.rawAttributes() }));

    return this;
  },

  destroyBookmark : function(e){
    e.preventDefault();

    var id    = $(e.currentTarget).attr('data-id'),
        model = this.collection.get(id);

    console.log("Destroy model " + model.get('_id'));
    alert("Not implemented destroy for " + model.get('_id'));
  }

});
