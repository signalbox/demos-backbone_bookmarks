Namespace('Demo.Models');

Demo.Models.Base = Backbone.Model.extend({

  rawAttributes : function(){
    return Backbone.Model.prototype.toJSON.call(this);
  },

  toJSON : function(){
    var attributes    = this.rawAttributes(),
        serializable  = this.serializable;

    _(attributes).each(function(value, key) {
      if(_.indexOf(serializable, key) == -1)
        delete attributes[key];
    });

    return attributes;
  }

});
