/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * searchOrderTracker module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox',
           'promise', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojradioset', 'ojs/ojcollapsible', 
           'hammerjs', 'ojs/ojjquery-hammer', 'ojs/ojoffcanvas', 'ojs/ojbutton'], 
    function (oj, ko, $) {
    /**
     * The view model for the main content view template
     * test
     */
    function searchOrderTrackerContentViewModel() {
        var self = this;
        
        self.value = ko.observable("");
        
        self.value.subscribe(function(newval){
            console.log(newval);
            
            //oj.Router.rootInstance.go('search_result');
            
            console.log(document.searchResultViewModel);
            //document.SearchResultViewModel.loadData(newval);
        });
        
        self.suggestions = function(context) {
          return new Promise(function(fulfill, reject) {

            var options = [];

            var term = context.term;

            $.getJSON("searchdata.json", function(data) {
              var opttys = [];
              var subs_plan = [];
              var general = [];
              $.each(data, function(key, value) { 
                  var obj = {
                        "id":value.id,
                        "type": value.type,
                        "org":  value.org,
                        "customer": value.customer,
                        "created": value.created
                      }
                  if(value.type === 'oppty'){
                      opttys.push(obj);
                  }else if(value.type === 'subscription_plan'){
                      subs_plan.push(obj);
                  }else{
                      general.push(obj);
                  }
              });
             
              var opportunities = {
                groupId : "grp:opptys:" + term,
                groupName : "OPPORTUNITIES",
                totalResults : opttys.lenght,
                items : opttys
              };
              
              var subs_planes = {
                groupId : "grp:subs_plan:" + term,
                groupName : "SUBSCRIPTIONS PLANS",
                totalResults : subs_plan.lenght,
                items : subs_plan
              };
              
              var generals = {
                groupId : "grp:general:" + term,
                groupName : "GENERALES",
                totalResults : general.lenght,
                items : general
              };
              
              
              options.push(opportunities);
              options.push(subs_planes);
              options.push(generals);

              fulfill(options);
            });
          });
        }
        
        $("#demo-status").text("Loading Demo...");
        
        $.getJSON( "searchdata.json",
            function (data) {
                $("#demo-status").text("");
            }
        );



        //OFFCANVAS FUNCTIONALITY
        this.drawRecent =
        {
          "displayMode": "push",
          "selector": "#drawRecent",
          "content": "#mainRecent"
        };
      
        this.toggleDrawRecent = function()
        {
          return oj.OffcanvasUtils.toggle(this.drawRecent);
        };

        this.openDrawRecent = function()
        {
          return oj.OffcanvasUtils.open(this.drawRecent);
        };

        this.isRTL = function()
        {
          var dir = document.documentElement.getAttribute("dir");
          if (dir)
            dir = dir.toLowerCase();
          return (dir === "rtl");
        };

        //use hammer for swipe
        var mOptions = {
          "recognizers": [
            [Hammer.Swipe, { "direction": Hammer["DIRECTION_UP"] }]
        ]};
 
        $("#main")
          .ojHammer(mOptions)
          .on("swipeleft", function(event) {
            event.preventDefault();
            if (self.isRTL())
              self.openDrawRecent();
          })
          .on("swiperight", function(event) {
            event.preventDefault();
            if (! self.isRTL())
              self.openDrawRecent();
          });
      
      
       this.drawFav =
       {
         "displayMode": "push",
         "selector": "#drawFav",
         "content": "#mainFav"
       };
      
       this.toggleDrawFav = function()
       {
         return oj.OffcanvasUtils.toggle(this.drawFav);
       };

        this.openDrawFav = function()
        {
          return oj.OffcanvasUtils.open(this.drawFav);
        };
      
        $("#main2")
          .ojHammer(mOptions)
          .on("swipeleft", function(event) {
            event.preventDefault();
            if (self.isRTL())
              self.openDrawFav();
          })
          .on("swiperight", function(event) {
            event.preventDefault();
            if (! self.isRTL())
              self.openDrawFav();
          });
       
    }
    
    return searchOrderTrackerContentViewModel;
});
