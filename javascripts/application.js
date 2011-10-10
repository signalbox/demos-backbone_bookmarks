$(function() {  
  
  // TODO: Move setup to an app object
  
  Handlebars.registerHelper('currentPage', function(page) {
    return this.page == page ? 'active' : '';
  });
  
  $.ajaxSetup({
    cache : false,
    dataType : "json",
    beforeSend : function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("X-SignalBox-User", "brent");
      xhr.setRequestHeader("X-SignalBox-App", "kible");
      xhr.setRequestHeader("X-SignalBox-Version", 1);
    }
  });
  
  var eventBus = _.extend({}, Backbone.Events);
  var app = new Demo.Models.App();
  var appView = new Demo.Views.App({ model : app });
  var router = new Demo.Router(app);
  app.signOut();
  
  Backbone.history.start({ pushState : false });

});
