window.Trellino.Views.ListsShow = Backbone.CompositeView.extend({
    id: function () {
        return 'list_' + String(this.model.get('id'))
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
        cardsNewView.render(); 
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
        this.$(".sortable").sortable({
            update: function (event, ui) {
                var data = $(this).sortable('serialize');
                var rank = data.replace(/card\[\]=/g, '').split("&");

                view.model.cards().forEach (function (card) {
                    card.save({"rank": _.indexOf(rank, String(card.id)) + 1}, {
                        success: function () {
                            view.model.cards().sort();
                        }
                    })
                });

                // view.model.cards().sync('update', view.model.cards());
                   
            }
        });
        this.renderSubviews();
        return this;
    },
    
    template: JST['lists/show'],
    
});