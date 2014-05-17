window.Trellino.Models.List = Backbone.Model.extend ({
    initialize: function (attr, options) {
        this.set(attr);
        this.board = options.board;
    },
    
    urlRoot: function () {
        return "api/boards/" + this.board.get("id") + "/lists";
    },
    
});