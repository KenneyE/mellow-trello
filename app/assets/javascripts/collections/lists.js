window.Trellino.Collections.Lists = Backbone.Collection.extend ({
    comparator: 'rank',
    
    model: Trellino.Models.List,

    url: function () {
        return this.board.url() + "/lists";
    },
    
    initialize: function (models, options) {
        this.board = options.board;
    },
    
    getOrFetch: function (id) {
        var lists = this;

        var list;
        if (list = this.get(id)) {
            list.fetch();
        } else {
            list = new Trellino.Models.List({ id: id });
            list.fetch({
                success: function () { lists.add(list); }
            });
        }

        return list;  
    },
    
});