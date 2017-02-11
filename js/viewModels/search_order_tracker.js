/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * searchOrderTracker module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox',
    'promise', 'ojs/ojconveyorbelt', 'ojs/ojradioset', 'ojs/ojcollapsible', 
     'ojs/ojbutton',
    'jqueryui-amd/core', 'jqueryui-amd/effect', 'ojs/ojtabs'], 
    function (oj, ko, $) {
    /**
     * The view model for the main content view template
     * test
     */
    function searchOrderTrackerContentViewModel() {
        var self = this;
        
        self.value = ko.observable("");
        
        self.value.subscribe(function(newval){
            //console.log(newval);
            localStorage.setItem("searchVal", newval);
            //console.log("el valor  es" +localStorage.getItem("searchVal"));
            oj.Router.rootInstance.go('search_result');
            
            //console.log("documentSearchResult " + document.searchResultViewModel);
            //document.SearchResultViewModel.loadData(newval);
        });
        
        self.suggestions = function(context) {
          return new Promise(function(fulfill, reject) {

            var options = [];

            var term = context.term;

            $.getJSON("js/mainDatasource.json", function(data) {
              var opttys = [];
              var subs_plan = [];
              var general = [];
              var invoice = [];
              $.each(data, function(key, value) { 
                   if(value.id.indexOf(term) !== -1 || value.org.indexOf(term) !== -1
                          || value.customer.indexOf(term) !== -1){
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
                    }else if(value.type === 'invoice'){
                        invoice.push(obj);
                    }else{
                        general.push(obj);
                    }
                  }
              });
             
              var opportunities = {
                groupId : "grp:opptys:" + term,
                groupName : "Opportunity",
                totalResults : opttys.length,
                items : opttys
              };
              
              var subs_planes = {
                groupId : "grp:subs_plan:" + term,
                groupName : "Subscription Plan",
                totalResults : subs_plan.length,
                items : subs_plan
              };
              
              var invoices = {
                groupId : "grp:invoice:" + term,
                groupName : "Invoice",
                totalResults : invoice.length,
                items : invoice
              };
              
              var generals = {
                groupId : "grp:general:" + term,
                groupName : "Other",
                totalResults : general.length,
                items : general
              };
              
              
              options.push(opportunities);
              options.push(subs_planes);
              options.push(invoices);
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

        self.filterButtonClick = function(data, event){
            $( "#recent-panel" ).slideToggle();
        };
        
        self.filterButtonClick = function(data, event){
            $( "#fav-panel" ).slideToggle();
        };
        
        self.handleBindingsApplied = function(info) {
            // Property change listeners for one-way data bound attributes.
            // Property change events will fire even when attribute expressions become disconnected
            //var form1 = document.getElementById('inputSearch');
            //console.log("Testing");
            //console.log(form1);
        };
       
    }
    
    return searchOrderTrackerContentViewModel;
});
