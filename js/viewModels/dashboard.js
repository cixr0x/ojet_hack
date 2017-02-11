/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      self.currentStepValue = ko.observable('stp1');
        this.stepArray = 
          ko.observableArray(
                  [{label:'Step One', id:'stp1'},
                         {label:'Step Two', id:'stp2'},
                         {label:'Step Three', id:'stp3'},
                         {label:'Step Four', id:'stp4'}, 
                         {label:'Step Five', id:'stp5'}]);
       self.currentStepValueText = function() {
		return ($("#train").ojTrain("getStep", self.currentStepValue())).label;
	};	                       
      
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
