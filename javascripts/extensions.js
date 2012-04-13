var Namespace = function(name){
  var root  = this,
      parts = name.split(".");

  _(parts).each(function(part) {
    root[part] = root[part] || {};
    root = root[part];
  });

  return root;
};

if(!Function.delegate){
	Function.prototype.delegate = function(scope, args){
		var fn = this;

		return function(){
			return fn.apply(scope, args || arguments);
		};
	};
};

if(!Array.toSentence){
  Array.prototype.toSentence = function(){
    var wordConnector = ", ",
        lastWordConnector = " and ",
        sentence = "",
        content = this.slice(),
        size = content.length;

    switch(size){
      case 0:
        sentence = "";
        break;
      case 1:
        sentence = content[0].toString();
        break;
      case 2:
        sentence = content[0].toString() + lastWordConnector + content[1].toString();
        break;
      default:
        sentence = content.splice(0, size - 1).join(wordConnector) + lastWordConnector + content[0];
    }
    return sentence;
  };
};

Backbone.View.prototype.close = function() {
  this.remove();
  this.unbind();

  if(this.onClose){
    this.onClose();
  }
};
