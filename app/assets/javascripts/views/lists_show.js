window.Trellino.Views.ListsShow = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.model, "change", this.render)
    },
    
    render: function () {
        var content = this.template({list: this.model});
        this.$el.html(content);
        return this;
    },
    
    template: JST['lists/show'],
})