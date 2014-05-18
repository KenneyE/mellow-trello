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
       "click #delete-board": "deleteBoard",
   },
   
   addMember: function (event) {
       event.preventDefault();
       var $form = $(event.currentTarget)
       var formData = $form.serializeJSON();
       var board = Trellino.Boards.getOrFetch(this.model.id);
       
       board.save({newMemberEmail: formData.group.member}, {
           success: function () {
               $("#flash-notice").html("Member Added");
                $form.find("input[type=text]").val("");
           },
           
           error: function () {
               $("#flash-error").html("Member Could Not Be Added");
               
           }
       });
   },
   
   deleteBoard: function (event) {
       event.preventDefault();
       this.model.destroy();  
       Backbone.history.navigate("", { trigger: true })
   },
});