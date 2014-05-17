window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
      new window.Trellino.Routers.AppRouter($("#body-wrapper"));
      Trellino.Boards = new Trellino.Collections.Boards();
      Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});
