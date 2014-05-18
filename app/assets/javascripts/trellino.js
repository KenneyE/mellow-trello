window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
      new window.Trellino.Routers.AppRouter($("div#content"));
      Trellino.boards = new Trellino.Collections.Boards();
      Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
    addSubview: function (selector, subview) {
        var selectorSubviews = 
        this.subviews()[selector] || (this.subviews()[selector] = []);
        
        selectorSubviews.push(subview);
        var $selectorEl = this.$(selector);
        $selectorEl.append(subview.$el);
    },
    
    renderSubviews: function () {
        var view = this;
        _(this.subviews()).each (function (selectorSubviews, selector) {
            var $selectorEl = view.$(selector).empty();
            _(selectorSubviews).each (function (subview) {
                $selectorEl.append(subview.render().$el);
                subview.delegateEvents();
            });
        });
    },
    
    remove: function () {
       Backbone.View.remove.prototype.call(this);
       _(this.subviews).each ( function (selectorSubviews, selector) {
           _(selectorSubview).each (function (subview) {
               subview.remove();
           });
       }) ;
    },
    
    removeSubview: function (selector, subview) {
        var selectorSubviews = 
        this.subviews()[selector] || (this.subviews()[selector] = []);
        
        var subviewIndex = selectorSubviews.indexOf(subview);
        selectorSubviews.splice(subviewIndex, 1);
        subview.remove();
    },
    
   subviews: function () {
       if (!this._subviews) {
           this._subviews = {};
       }
       return this._subviews;
   },
});

$(document).ready(function(){
  Trellino.initialize();
});
