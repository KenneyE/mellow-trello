window.Trellino.Models.List = Backbone.Model.extend ({
    initialize: function (attrs, options) {
        this.set(attrs);
        this.board = options.board;
    },
    
    url: function () {
        if (this.isNew()) {
            return "api/boards/" + this.get("board_id") + "/lists";
        } else {
            return "api/lists/" + this.get('id');
        }
    },
    
    cards: function () {
        this._cards = this._cards || 
            new Trellino.Collections.Cards([], {list: this});
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