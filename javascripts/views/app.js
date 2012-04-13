Demo.Views.App = Demo.Views.Base.extend({

  el : '#container',

  initialize : function() {
    this.model.bind('change:page', this.render, this);
  },

  render : function() {
    if(this.view){
      this.view.close();
    }

    this.renderNav();
    this.renderPage();

    return this;
  },

  renderNav : function() {
    var template = Handlebars.compile($("#nav-template").html());

    $('#nav').html(template(this.model.toJSON()));
    $('#nav').show();
  },

  renderPage : function() {
    var page = this.model.get('page'),
        viewFactory;

    if(page === 'about'){
      viewFactory = Demo.Views.About;
    }
    else if(page === 'dashboard'){
      viewFactory = Demo.Views.Dashboard;
    }
    else {
      viewFactory = Demo.Views.SignIn;
    }

    this.view = new viewFactory({ model : this.model });

    $(this.el).html(this.view.render({}).el);
  }

});
