Namespace('Demo.Collections');

Demo.Collections.Base = Backbone.Collection.extend({});

Demo.Collections.Bookmarks = Demo.Collections.Base.extend({
	
	model : Demo.Models.Bookmark,
	
	initialize : function(models, options){
		this.user = options.user;
	},
	
	url : function(){
		return this.user.url() + '/bookmarks';
	},
	
	parse : function(response) {
	  var records = response.records;
	  
	  _(records).each(function(record) {
	    record.user = this.user;
	  }, this);
	  
	  this.currentPage = response.current_page;
	  this.perPage = response.per_page;
	  this.total_pages = response.total_pages;
	  this.total_records = response.total_records;
	  
		return records;
	}
	
});
