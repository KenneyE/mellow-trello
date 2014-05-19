window.Trellino.Collections.Cards = Backbone.Collection.extend ({
    comparator: 'rank',
    
    model: Trellino.Models.Card,
    
    url: function () {
        debugger
        return this.list.url() + "/cards";
    },
    
    initialize: function (models, options) {
        this.list = options.list;
    },
    
});