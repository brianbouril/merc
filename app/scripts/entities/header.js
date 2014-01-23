define(["application", "backbone.picky"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    
    Entities.Header = Backbone.Model.extend({
      initialize: function(){
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
      model: Entities.Header,

      initialize: function(){
        var singleSelect = new Backbone.Picky.SingleSelect(this);
        _.extend(this, singleSelect);
      }
    });

    var initializeHeaders = function(){
      Entities.headers = new Entities.HeaderCollection([
        { name: "Grid", url: "grid", navigationTrigger: "grid:show" },
        { name: "Screener", url: "screener", navigationTrigger: "screener:show" },
        { name: "Tools", url: "tools", navigationTrigger: "tools:show" },
        { name: "Quicktakes", url: "quicktakes", navigationTrigger: "quicktakes:show" }
      ]);
    };

    var API = {
      getHeaders: function(){
        if(Entities.headers === undefined){
          initializeHeaders();
        }
        return Entities.headers;
      }
    };

    App.reqres.setHandler("header:entities", function(){
      return API.getHeaders();
    });
  });

  return ;
});