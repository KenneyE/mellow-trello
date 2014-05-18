window.Trellino.Views.ListsNew = Backbone.View.extend ({
    template: JST['lists/new'],
    
    initialize: function (options) {
        this.board = options.board;
    },
    
    render: function () {
        var content = this.template({ board: this.board });
        this.$el.html(content);
        return this;
    },
    
    events: {
        "submit form" : "addList",
    },
    
    addList: function (event) {
        event.preventDefault();
        $form = $(event.currentTarget);
        formData = $form.serializeJSON();
        
        var board = Trellino.boards.getOrFetch(this.board.get('id'));
        var newList = new Trellino.Models.List(formData.list, {board: board});
        
        newList.save( {}, {
                success: function () {
                    board.lists().add(newList);
                    url = "#/" + board.id;
                    Backbone.history.navigate(url, {trigger: true});
                },
                
                error: function () {
                    console.log("List didn't save");
                },
            }
        );
        
    },
        
});