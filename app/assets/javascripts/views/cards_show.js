window.Trellino.Views.CardsShow = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(this.model, "sync", this.render);
    },
    
    render: function () {
       var content = this.template({card: this.model});
       this.$el.html(content);
       return this; 
    },
    
    template: JST["cards/show"],
});