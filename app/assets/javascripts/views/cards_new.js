window.Trellino.Views.CardsNew = Backbone.View.extend ({
    initialize: function (options) {
        this.list = options.list;
    },
    
    events: {
        "submit .new-card-form": "newCard",
    },
    
    template: JST["cards/new"],
    
    render: function () {
        var content = this.template({list: this.list});
        this.$el.html(content);
        return this;
    },
    
    newCard: function (event) {
        var that = this;
        event.preventDefault();
        this.$(".new-card-modal").modal("hide");
        $form = $(event.currentTarget);
        formData = $form.serializeJSON();
       
        // var list = Trellino.Collections.Lists.getOrFetch(this.model.id);
        var card = new Trellino.Models.Card(formData.card);
        card.save({}, {
            success: function () {
                that.list.cards().add(card);
            }
        })
    },
});