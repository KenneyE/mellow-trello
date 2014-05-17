window.Trellino.Models.Board = Backbone.Model.extend({
    urlRoot: "api/boards",
    
    lists: function () {
        this._lists = this._lists || 
            new Trellino.Collections.Lists([], {board: this});
        return this._lists;
    },
    
    parse: function (board) {
        if (board.lists) {
            this.lists().set(board.lists, { parse: true });
            delete board.lists;
        }
        return board;
    },
});