window.Trellino.Models.Card = Backbone.Model.extend ({
    urlRoot: function () {
        return "api/lists/" + this.get('list_id') + "/cards";
    },
    
});