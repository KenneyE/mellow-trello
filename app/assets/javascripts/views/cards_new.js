window.Trellino.Views.CardsNew = Backbone.View.extend ({
    template: JST["cards/new"],
    
    render: function () {
        var content = this.template();
        this.$el.html(content);
        return this;
    },
});