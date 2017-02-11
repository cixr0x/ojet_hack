/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * searchOrderTracker module
 */
define(['ojs/ojcore', 'knockout', 'jquery','./dao', 'ojs/ojknockout', 'ojs/ojselectcombobox',
    'promise', 'ojs/ojconveyorbelt', 'ojs/ojradioset', 'ojs/ojcollapsible', 
     'ojs/ojbutton',
    'jqueryui-amd/core', 'jqueryui-amd/effect', 'ojs/ojtabs'], 
    function (oj, ko, $, dao) {
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
              
              var typeArray = {};
              
              for (var type in dao.typeLabel){
                  //console.log(type);
                  typeArray[type] = [];
              }
              
              
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
                        
                    for (var type in dao.typeLabel){
                  //console.log(type);
                        if (value.type === type)
                        typeArray[type].push(obj);
                    }
                    
                  }
              });
             
             var optionArray = {};
              
              for (var type in dao.typeLabel){
                  //console.log(type);
                  optionArray[type] = {
                     groupId : "grp:"+type+":" + term,
                        groupName : dao.typeLabel[type],
                        totalResults : typeArray[type].length,
                        items : typeArray[type] 
                  };
                  if (typeArray[type].length > 0)
                  options.push(optionArray[type]);
              }

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
        
        self.favAttributes=ko.observableArray([{"subName":"a","subLastDate":"subLastDate","subLastDescription":"subLastDescription","subLastStep":"subLastStep"}]); 
        
        self.historyTemp = null;
        
        $.getJSON("js/historyDatasource.json", function(hisData) {     
            self.historyTemp = hisData;
        });
        
        var typeLabel = {};
        typeLabel["subscription_plan"] = "Subscription Plan";
        typeLabel["oppty"] = "Opportunity";
        typeLabel["invoice"] = "Invoice";
        typeLabel["order"] = "Order";


        
        self.updateFavorites = function(){            
            $.getJSON("js/mainDatasource.json", function(data) {         
                var a = [];
                var name;
                this.subLastDate;
                this.subLastDescription;
                this.subLastStep;
                this.subName;
                
                data.forEach(function(item,index){
                    if(item.favorite){
                        
                        this.subName = typeLabel[item.type] +" "+ item.id;                       
                        this.subLastDate = self.historyTemp[item.id][self.historyTemp[item.id].length-1]["date"];
                            this.subLastDescription = self.historyTemp[item.id][self.historyTemp[item.id].length-1]["description"];
                            this.subLastStep = self.historyTemp[item.id][self.historyTemp[item.id].length-1]["step"];
                        a.push({"subName":subName,"subLastDate":this.subLastDate,"subLastDescription":this.subLastDescription,"subLastStep":this.subLastStep});
                    }
                });
                    console.log(a);
                    self.favAttributes(a); 
                });                                        
        };
        
        self.updateFavorites();
       
    }
    
    return searchOrderTrackerContentViewModel;
});
