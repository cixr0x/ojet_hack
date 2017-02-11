/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * history module
 */
define(['ojs/ojcore', 'knockout', 'jquery', './dao','ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojtabs',  'ojs/ojselectcombobox',
    'ojs/ojconveyorbelt', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojinputtext', 'ojs/ojgauge'
], function (oj, ko, $, dao) {
    /**
     * The view model for the main content view template
     */
    function historyContentViewModel() {
        var self = this;        
        var id = localStorage.getItem("detailVal");
        
        var typeLabel = dao.typeLabel;
                     
        self.historyTitle = ko.observable("Subscription Plan 1000198");
        self.currentStepValue = ko.observable('stp3');
        self.stepArray = ko.observableArray([]);
        self.items = ko.observableArray([{"id":1,"step":"Store","date":"1-Jan-2016 18:00","status":"success","description":"Order sent to CPQ"}]);
        self.dataSource = new oj.ArrayTableDataSource(self.items, {idAttribute: "id"});
        self.isFavorite = ko.observable(1);
        self.itemNumber = 1;
        self.toggleFavorite = function(){
            self.isFavorite(self.isFavorite() == 1? 0 : 1);
        };
        
        self.updateSteps=function(){             
            $.getJSON("js/historyDatasource.json", function(data) {

                var lastStep = "";           
                var steps = [];

                data[id].forEach(function(item,index){
                    if(lastStep!=item["step"]){
                        lastStep=item["step"];
                        steps.push({label:item["step"],id:"stp"+index,disabled: true});
                    }
                });
                self.stepArray(steps);
                self.currentStepValue(steps[steps.length-1]["id"]);
                self.items(data[id]);
            });
        };
        
        self.attributes = ko.observableArray([]);
        
        self.updateDetails = function(){            
            $.getJSON("js/mainDatasource.json", function(data) {         
                var a = [];
                var name;
                var count = 0 ;
                data.forEach(function(item,index){
                    if(item["id"]==id){                         
                        for(var item2 in item)
                            a.push({"value":item2 == 'type'? typeLabel[item[item2]]:item[item2],"label":item2}); 
                        name=typeLabel[item["type"]]+" "+item["id"];
                        self.itemNumber = count;
                    }
                    count++;
                });
                    self.attributes(a); 
                    self.historyTitle(name);
                });                                        
        };
        
        self.loadMenu = function(data) {       
              $('#actionMenu').ojPopup('open', 'position', {at: 'rigth bottom', my: 'left top', tail:"simple"});
        };
        self.contactTeam = function(data) {       
              $('#actionMenu').ojPopup('open', 'position', {at: 'rigth bottom', my: 'left top', tail:"simple"});
        };
        self.openTicket = function(data) {       
              $('#actionMenu').ojPopup('open', 'position', {at: 'rigth bottom', my: 'left top', tail:"simple"});
        };
        //Search implementation
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
        //End search implementation
        self.contactTeamModal = function() {$("#contactTeamDialog").ojDialog("open"); };
        self.openTicketModal = function() {$("#openTicketDialog").ojDialog("open");};
        self.contactTeamModalClose = function() {$("#contactTeamDialog").ojDialog("close"); };
        self.openTicketModalClose = function() {$("#openTicketDialog").ojDialog("close");};
        
        
        
        
        self.updateDetails();
        self.updateSteps();

        
    }
    
    return historyContentViewModel;
});
