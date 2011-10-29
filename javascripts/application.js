$(function() {  
  
  // TODO: Move setup to an app object
  Handlebars.registerHelper('currentPage', function(page) {
    return this.page == page ? 'active' : '';
  });
  
  $.ajaxSetup({
    cache : false,
    dataType : "json",
    beforeSend : function(xhr, settings) {
      var prefix = (settings.url.indexOf("?") > -1) ? "&" : "?";
      settings.url += prefix + $.param({
        sb_version : Demo.Config.version,
        sb_username : Demo.Config.username,
        sb_app_name : Demo.Config.appName
      });
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    }
  });
  
  var eventBus = _.extend({}, Backbone.Events);  // TODO: Remove if not in use
  var app = new Demo.Models.App();
  var appView = new Demo.Views.App({ model : app });
  var router = new Demo.Router(app);
  app.signOut();
  
  Backbone.history.start({ pushState : false });

});
