/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * history module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojtabs', 
    'ojs/ojconveyorbelt', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojinputtext'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function historyContentViewModel() {
        var self = this;        
        var id = '10001001';
                     
        self.historyTitle = ko.observable("Subscription Plan 1000198");
        self.currentStepValue = ko.observable('stp3');
        self.stepArray = ko.observableArray([]);
        self.items = ko.observableArray([{"id":1,"step":"Store","date":"1-Jan-2016 18:00","status":"success","description":"Order sent to CPQ"}]);
        self.dataSource = new oj.ArrayTableDataSource(self.items, {idAttribute: "id"});
        
        
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
                data.forEach(function(item,index){
                    if(item["id"]==id){                         
                        for(var item2 in item)
                            a.push({"value":item[item2],"label":item2}); 
                        name=item["type"]+" "+item["id"];
                    }
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
        
        self.contactTeamModal = function() {$("#contactTeamDialog").ojDialog("open"); };
        self.openTicketModal = function() {$("#openTicketDialog").ojDialog("open");};
        self.contactTeamModalClose = function() {$("#contactTeamDialog").ojDialog("close"); };
        self.openTicketModalClose = function() {$("#openTicketDialog").ojDialog("close");};
        
        
        
        
        self.updateDetails();
        self.updateSteps();

        
    }
    
    return historyContentViewModel;
});
