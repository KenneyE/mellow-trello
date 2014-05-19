window.Trellino.Views.CardsShow = Backbone.View.extend ({    
    events: {
        "mouseenter": "showDeleteButton",
        "mouseleave": "showDeleteButton",
        "click .delete-card": "removeCard",
    },
    
    initialize: function (options) {
        this.list = options.list;
        this.listenTo(this.model, "sync", this.render);
        
    },
    
    removeCard: function () {
        this.list.cards().remove(this.model);
        this.model.destroy();
    },
    
    render: function () {
        var content = this.template({card: this.model});
        this.$el.html(content);
        return this; 
    },
    
    showDeleteButton: function (event) {
        var button = $(event.currentTarget).find(".delete-card");
        button.toggleClass("hidden");
    },
    
    template: JST["cards/show"],
});