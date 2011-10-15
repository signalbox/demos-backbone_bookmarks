Namespace('Demo.Collections');

Demo.Collections.Base = Backbone.Collection.extend({});

Demo.Collections.Bookmarks = Demo.Collections.Base.extend({
	
	model : Demo.Models.Bookmark,
	
	initialize : function(models, options) {
		this.user_id = options.user_id;
	},
	
	url : function() {
	  query = 'user_id="' + this.user_id + '"';
		return '/proxy/resources/bookmarks?query=' + escape(query);
	},
	
	parse : function(response) {
	  var records = response.records;
	  
	  _(records).each(function(record) {
	    record.user_id = this.user_id;
	  }, this);
	  
	  this.currentPage = response.current_page;
	  this.perPage = response.per_page;
	  this.total_pages = response.total_pages;
	  this.total_records = response.total_records;
	  
		return records;
	}
	
});
