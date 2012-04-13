Demo.Models.Bookmark = Demo.Models.Base.extend({

  serializable : [ 'id', 'location', 'user_id' ],

  urlRoot : Demo.Config.url + 'resources/bookmarks'

});
