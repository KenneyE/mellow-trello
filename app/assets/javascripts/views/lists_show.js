window.Trellino.Views.ListsShow = Backbone.CompositeView.extend({
    tagName: "li",
    
    className: "list col-xs-3",
    
    id: function () {
        return 'list_' + String(this.model.get('id'));
    },
    
    initialize: function () {
        var view = this;
        this.listenTo(this.model, "sync", this.render);
        this.listenTo(this.model.cards(), "add", this.addCard);
        this.listenTo(this.model.cards(), "remove", this.removeCard);

        this.model.cards().each ( function (card) {
            view.addCard(card);
        });
        
        this.newCardView();
    },
    
    addCard: function (card) {
        var cardsShowView = 
            new Trellino.Views.CardsShow({model: card, list: this.model});
        this.addSubview(".cards", cardsShowView);
        cardsShowView.render();
    },
        
    events: {
        "click .new-card-button": "showNewCardModal",
    },

    showNewCardModal: function () {
        this.$(".new-card-modal").modal("show");
    },
    
    newCardView: function () {
        var cardsNewView = new Trellino.Views.CardsNew({ list: this.model });
        this.addSubview("div.new-card", cardsNewView);
        // cardsNewView.render(); 
    },
    
    removeCard: function (card) {
        var cardsShowView = 
        _(this.subviews()[".cards"]).find (function (subview) {
            return subview.model == card;
        });
       
        this.removeSubview(".cards", cardsShowView);
    },
    
    render: function () {
        var view = this;
        var content = this.template({list: this.model});

        this.$el.html(content);
        this.$el.find(".sortable-cards").sortable({
            connectWith: ".sortable-cards",
            
            update: function (event, ui) {
                debugger;
                var data = $(this).sortable('serialize');
                // var card = view.findCard($(ui.item));
                // view.model.cards().remove(card);
                view.updateRanks(data);
                // view.model.cards().sync('update', view.model.cards());
            },
            
            // receive: function (event, ui) {
            //     debugger;
            //     var movedCard = view.findCard($(ui.item));
            //     
            //     var targetListID = $(event.target).data('id');
            //     var newList = view.model.board.lists().find(function (list) {
            //         return list.get('id') == targetListID;
            //     });
            //     
            //     newList.cards().add(movedCard);
            //     
            //     var data = $(event.target).sortable('serialize');
            //     view.updateRanks(data);
            // }
        });
        
        this.renderSubviews();
        return this;
    },
    
    updateRanks: function (data) {
        var rank = data.replace(/card\[\]=/g, '').split("&");
        this.model.cards().forEach (function (card) {
            card.save({"rank": _.indexOf(rank, String(card.id)) + 1}, {
                // success: function () {
                //     view.model.cards().sort();
                // }
            });
        });
    },
    
    findCard: function ($item) {
        var cardID =  $item.attr('id').replace(/card\_/g, '');
        var movedCard = this.model.cards().find( function (card) {
            return card.get('id') == cardID;
        });
        return movedCard;
    },
    
    template: JST['lists/show'],
    
});