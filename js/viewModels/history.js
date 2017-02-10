/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * history module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'promise', 'ojs/ojlistview'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function historyContentViewModel() {
        var self = this;        
        
        self.historyTitle = ko.observable("Subscription Plan 1000198");
        self.currentStepValue = ko.observable('stp3');
        self.stepArray = 
		  ko.observableArray(
			  [{label:'Store', id:'stp1', disabled: true,visited: false},
				 {label:'CPQ', id:'stp2', disabled: true, visited: true},
				 {label:'OM', id:'stp3', disabled: true, visited: true},
				 {label:'SPM', id:'stp4', disabled: true}, 
				 {label:'TAS', id:'stp5', disabled: true}]);
        			
        
    }
    
    return historyContentViewModel;
});
