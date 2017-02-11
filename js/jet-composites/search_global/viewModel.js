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
    function model(context) {
        var self = this;
        
        self.searchValue = ko.observable("");
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


       
    }
    
    return model;
});
