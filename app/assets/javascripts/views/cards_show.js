window.Trellino.Views.CardsShow = Backbone.View.extend ({    
    events: {
        "mouseenter": "showDeleteButton",
        "mouseleave": "showDeleteButton",
        "click .delete-card": "removeCard",
    },
    
    initialize: function () {
        this.listenTo(this.model, "sync", this.render);
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