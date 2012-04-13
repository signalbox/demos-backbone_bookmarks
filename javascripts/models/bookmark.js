Demo.Models.Bookmark = Demo.Models.Base.extend({

  serializable : [ '_id', 'location', 'user_id' ],

  urlRoot : Demo.Config.url + 'resources/bookmarks'

});
