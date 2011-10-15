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
      xhr.setRequestHeader("X-SignalBox-UserID", "4e997eaa2388cb0208000001");
      xhr.setRequestHeader("X-SignalBox-AppID", "4e998bbf2388cb0652000001");
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
