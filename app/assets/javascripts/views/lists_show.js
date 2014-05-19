window.Trellino.Views.ListsShow = Backbone.CompositeView.extend({
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
        var cardsShowView = new Trellino.Views.CardsShow({model: card});
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
           subview.model == card;
       });
       
       this.removeSubview(".cards", cardsShowView);
    },
    
    render: function () {
        var view = this;
        var content = this.template({list: this.model});
        this.$el.html(content);
        
        this.renderSubviews();
        return this;
    },
    
    template: JST['lists/show'],
    
});