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
   
   events: {
       "submit #add-member": "addMember",
   },
   
   addMember: function (event) {
       event.preventDefault();
       var $form = $(event.currentTarget)
       var formData = $form.serializeJSON();
       var board = Trellino.Boards.getOrFetch(this.model.id);
       board.set({newMemberEmail: formData.group.member})
       
       board.save({}, {
           success: function () {
               console.log("Saved");
                $form.find("input").val("")
           }
       });
   },
});