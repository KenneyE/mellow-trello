window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
      new window.Trellino.Routers.AppRouter($(".container"));
      Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});
