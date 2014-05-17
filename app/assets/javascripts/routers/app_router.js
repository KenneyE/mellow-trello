window.Trellino.Routers.AppRouter = Backbone.Router.extend({
    initialize: function ($rootEl) {
        this.$rootEl = $rootEl;
    },
    
    routes: {
        "": "boardsIndex",
        "new": "newBoard",
        ":board_id/new_list": "newList",
        ":id" : "showBoard",
    },
    
    boardsIndex: function () {
        
        Trellino.Boards.fetch();

        var view = new Trellino.Views.BoardsIndex({collection: Trellino.Boards});
        view.render();
        
        this.$rootEl.html(view.$el);
    },
    
    newBoard: function () {
        var view = new Trellino.Views.BoardNew();
        view.render();
        this.$rootEl.html(view.$el);
    },
    
    showBoard: function (id) {
        var board = new Trellino.Models.Board({id: id});
        board.fetch();
        board.lists().fetch();
        
        var view = new Trellino.Views.BoardShow({model: board});
        view.render();

        this.$rootEl.html(view.$el);
    },
    
    newList: function (board_id) {
        var board = Trellino.Boards.getOrFetch(board_id);
        
        var view = new Trellino.Views.ListsNew({board: board});
        view.render();
        this.$rootEl.html(view.$el);
    },
});