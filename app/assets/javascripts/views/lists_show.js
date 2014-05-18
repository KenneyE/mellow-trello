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
        "submit #new-card-form": "newCard",
    },
    
    newCard: function (event) {
       event.preventDefault();
       $form = $(event.currentTarget);
       formData = $form.serializeJSON();
       
       // var list = Trellino.Collections.Lists.getOrFetch(this.model.id);
       var card = new Trellino.Models.Card(formData.card, {list: this.model});
       card.save({}, {
           success: alert("Card was saved")
       });
    },
    
    newCardView: function () {
       var cardsNewView = new Trellino.Views.CardsNew();
       this.addSubview(".new-card", cardsNewView);
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