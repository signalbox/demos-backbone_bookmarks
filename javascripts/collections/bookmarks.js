Demo.Collections.Bookmarks = Demo.Collections.Base.extend({

  model : Demo.Models.Bookmark,

  initialize : function(models, options) {
    this.user_id = options.user_id;
  },

  url : function() {
    var query = this.buildQuery("SELECT * WHERE user_id = '{user_id}'", { user_id : this.user_id });

    return Demo.Config.url + 'resources/bookmarks?query=' + query;
  },

  parse : function(response) {
    var records = Demo.Collections.Base.prototype.parse.call(this, response);

    _(records).each(function(record) {
      record.user_id = this.user_id;
    }, this);

    return records;
  }

});
