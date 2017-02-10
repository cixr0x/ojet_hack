/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * searchOrderTracker module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox',
           'promise'], 
    function (oj, ko, $) {
    /**
     * The view model for the main content view template
     * test
     */
    function searchOrderTrackerContentViewModel() {
        var self = this;
        
        self.suggestions = function(context) {
          return new Promise(function(fulfill, reject) {

            var options = [];

            var term = context.term;

            $.getJSON("data.json", function(data) {
              var employees;
              var managers;

              var groups = data.grouped.isManager.groups;
              $.each(groups, function(index, group) {
                if (group.groupValue == 0) {
                  var emp = {
                    groupId : "grp:employees:" + term,
                    groupName : "EMPLOYEES",
                    totalResults : group.doclist.numFound,
                    items : group.doclist.docs
                  };
                  employees = emp;
                } else {
                  var mng = {
                    groupId : "grp:managers:" + term,
                    groupName : "MANAGERS",
                    totalResults : group.doclist.numFound,
                    items : group.doclist.docs
                  };
                 managers = mng;
                }
              })
              
              var folders;
              var files;
              
              var isFile = data.attr.id;
              
              
              
              
                
              ;

              options.push(employees);
              options.push(managers);

              fulfill(options);
            });
          });
        }
        
        $("#demo-status").text("Loading Demo...");
        
        $.getJSON( "data.json",
            function (data) {
                console.log("LOS DATA: ");
                console.log(data);
                
                //new MockSolrServer(data, {url:/^http:\/\/mocksolr\/collection\/select.*/i});
                
                 //ko.applyBindings(new SearchModel(), document.getElementById('form1'));
                 
                 $("#demo-status").text("");
            }
        );
    }
    
    return searchOrderTrackerContentViewModel;
});
