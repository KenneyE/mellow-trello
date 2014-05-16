window.Trellino.Views.NewBoard = Backbone.View.extend ({
    template: JST["boards/new"],
    
    render: function () {
        var content = this.template();
        this.$el.html(content);
        return this;
    },
    
    events: {
        "submit form" : "submit",
    },
    
    submit: function (event) {
        event.preventDefault();
        var $form = $(event.currentTarget);
        var formData = $form.serializeJSON();
        
        var board = new Trellino.Models.Board(formData.board);
        board.save({}, {
            success: function () {
                Backbone.history.navigate("", {trigger: true })
            }
        })
    }    
});