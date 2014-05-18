window.Trellino.Models.List = Backbone.Model.extend ({
    initialize: function (attrs, options) {
        this.set(attrs);
        this.board = options.board;
    },
    
    urlRoot: function () {
        return "api/boards/" + this.board.get("id") + "/lists";
    },
    
    cards: function () {
        this._cards = this._cards || 
            new Trellino.Collections.Lists([], {list: this});
        return this._cards;
    },
    
    parse: function (resp) {
        if (resp.cards) {
            this.cards().set(resp.cards, {parse: true});
            delete resp.cards;
        }
        return resp;
    },
});