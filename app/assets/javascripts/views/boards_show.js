window.Trellino.Views.BoardShow = Backbone.View.extend ({
   template: JST["boards/show"],
   
   initialize: function () {
       this.listenTo(this.model, "sync", this.render);       
       this.listenTo(this.model.lists(), "sync", this.render);
   },
   
   render: function () {
       var view = this;
       var board = Trellino.Boards.getOrFetch(this.model.id);
       
       var content = this.template( {board: board });
       this.$el.html(content);
       
       return this;
   },
});