window.Trellino.Routers.AppRouter = Backbone.Router.extend({
    initialize: function ($rootEl) {
        this.$rootEl = $rootEl;
    },
    
    routes: {
        "": "boardsIndex",
        "new": "newBoard",
        ":id" : "showBoard",
        ":board_id/new_list": "newList",
        
    },
    
    boardsIndex: function () {
        
        Trellino.boards.fetch();

        var view = new Trellino.Views.BoardsIndex({collection: Trellino.boards});
        view.render();
        
        this.$rootEl.html(view.$el);
    },
    
    newBoard: function () {
        var view = new Trellino.Views.BoardNew();
        view.render();
        this.$rootEl.html(view.$el);
    },
    
    showBoard: function (id) {
        var board = Trellino.boards.getOrFetch(id);
        
        var view = new Trellino.Views.BoardShow({model: board});
        view.render();

        this.$rootEl.html(view.$el);
    },
    
    newList: function (board_id) {
        var board = Trellino.boards.getOrFetch(board_id);
        
        var view = new Trellino.Views.ListsNew({board: board});
        view.render();
        this.$rootEl.html(view.$el);
    },
});