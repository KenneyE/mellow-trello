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
        var that = this;
        event.preventDefault();
        $form = $(event.currentTarget);
        formData = $form.serializeJSON();
        
        // var board = Trellino.boards.getOrFetch(this.board.get('id'));
        var newList = new Trellino.Models.List(formData.list, {board: this.board});
        
        newList.save( {}, {
                success: function () {
                    that.board.lists().add(newList);
                    url = "#/" + that.board.id;
                    Backbone.history.navigate(url, {trigger: true});
                },
                
                error: function () {
                    console.log("List didn't save");
                },
            }
        );
        
    },
        
});