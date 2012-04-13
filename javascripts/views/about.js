Demo.Views.About = Demo.Views.Base.extend({

  id : 'about',

  initialize : function() {
    this.template = Handlebars.compile($("#about-template").html());
  },

  render : function() {
    $(this.el).html(this.template());

    return this;
  }

});
