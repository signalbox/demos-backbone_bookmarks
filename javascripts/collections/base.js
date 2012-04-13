Namespace('Demo.Collections');

Demo.Collections.Base = Backbone.Collection.extend({

  rawAttributes : function() {
    return this.map(function(model){
      return model.rawAttributes();
    });
  },

  parse : function(response) {
    this.perPage      = response.per_page;
    this.currentPage  = response.current_page;
    this.totalPages   = response.total_pages;
    this.totalRecords = response.total_records;

    return response.records;
  },

  get : function(id){
    return this.find(function(m){
      return m.get('_id') === id;
    })
  },

  buildQuery : function(query, replacements){
    _(replacements).each(function(value, key){
      query = query.replace(new RegExp("{" + key + "}", "ig"), value);
    });

    return escape(query);
  }

});
