window.Trellino.Routers.AppRouter = Backbone.Router.extend({
    initialize: function ($rootEl) {
        this.$rootEl = $rootEl;
    },
    
    routes: {
        "": "boardsIndex",
        "new": "newBoard",
    },
    
    boardsIndex: function () {
        var boards = new Trellino.Collections.Boards();
        boards.fetch();

        var view = new Trellino.Views.BoardsIndex({collection: boards});
        view.render();
        
        this.$rootEl.html(view.$el);
    },
    
    newBoard: function () {
        var view = new Trellino.Views.NewBoard();
        view.render();
        this.$rootEl.html(view.$el);
    },
});