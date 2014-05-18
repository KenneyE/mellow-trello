window.Trellino.Collections.Cards = Backbone.Collection.extend ({
    model: Trellino.Models.Card,
    
    url: function () {
        return this.list.url() + "/cards";
    },
    
    initialize: function (models, options) {
        this.list = options.list;
    },
});