window.Trellino.Views.BoardShow = Backbone.CompositeView.extend ({
    template: JST["boards/show"],
      
    initialize: function () {
        var view = this;
        this.listenTo(this.model, "sync", this.render);       
        this.listenTo(this.model.lists(), "add", this.addList);
        this.listenTo(this.model.lists(), "remove", this.removeList);
        view.model.lists().sort();
        
        this.model.lists().each (function (list) {
            view.addList(list);
        });
    },
    
    addList: function (list) {
        var listsShowView = new Trellino.Views.ListsShow({model: list});
        this.addSubview(".lists", listsShowView);
        listsShowView.render();
    },
   
    removeList: function (list) {
        var listsShowView =
            _(this.subviews()[".lists"]).find( function (subview) {
                subview.model ==  list;
            });
            
        this.removeSubview(".lists",  listsShowView);
    },
    
    render: function () {
        var view = this;
        var content = this.template( {board: this.model });
        this.$el.html(content);
        this.$(".sortable-lists").sortable({
            update: function (event, ui) {
                var data = $(this).sortable('serialize');
                var rank = data.replace(/list\[\]=/g, "").split("&");
                
                view.model.lists().forEach (function (list) {
                    list.save({"rank": _.indexOf(rank, String(list.id)) + 1}, {
                        // success: function () {
                        //     view.model.lists().sort();
                        // }
                    });
                });
            },
        });

        this.renderSubviews();
        return this;
    },
   
    events: {
        "submit #add-member": "addMember",
        "click #delete-board": "deleteBoard",
    },
   
    addMember: function (event) {
        event.preventDefault();
        var $form = $(event.currentTarget);
        var formData = $form.serializeJSON();
        var board = Trellino.boards.getOrFetch(this.model.id);
       
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
        Backbone.history.navigate("", { trigger: true });
    },
});