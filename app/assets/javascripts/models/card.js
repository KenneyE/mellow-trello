window.Trellino.Models.Card = Backbone.Model.extend ({
    url: function () {
        if (this.isNew()) {
            return "api/lists/" + this.get('list_id') + "/cards";
        } else {
            return "api/cards/" + this.get('id');
        }
    },
    
});