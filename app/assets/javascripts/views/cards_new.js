window.Trellino.Views.CardsNew = Backbone.View.extend ({
    initialize: function (options) {
        this.list = options.list;
    },
    
    template: JST["cards/new"],
    
    render: function () {
        var content = this.template({list: this.list});
        this.$el.html(content);
        return this;
    },
});