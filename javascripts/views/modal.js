Demo.Views.Modal = Demo.Views.Base.extend({

  className : 'modal fade',

  render : function() {
    $(this.el).html(this.template());
    $('body').append($(this.el));

    $(this.el).bind('hidden', this.close.delegate(this));

    $(this.el).modal({
      backdrop : true,
      keyboard : true,
      show     : true
    });

    return this;
  },

  closeModal : function() {
    this.trigger('onCloseModal');

    $(this.el).modal('hide');
  }

});
