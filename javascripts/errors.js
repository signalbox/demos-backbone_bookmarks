Demo.Errors = function(raw){
  this.obj = JSON.parse(raw);

  this.toString = function(){
    return _(this.obj).map(function(errors, attribute){
      return _(errors).map(function(error){
        return "* " + attribute + " " + error + ".";
      }).join('\n');
    }).join('\n');
  };
}
