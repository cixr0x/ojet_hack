/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', './dao', 'ojs/ojknockout', 'ojs/ojselectcombobox', 
	'promise', 'ojs/ojconveyorbelt','ojs/ojlistview',
        'ojs/ojjsontreedatasource', 'ojs/ojbutton', 'ojs/ojdatetimepicker', 
	'jqueryui-amd/effect', 'jqueryui-amd/core'],
 function(oj, ko, $, dao) {
  
    
    function SearchResultViewModel() {
      var self = this;
      self.dataSource= ko.observableArray([]);
      
      self.value = ko.observable("");
      
      self.value.subscribe(function(newval){
            localStorage.setItem("searchVal", newval);
            oj.Router.rootInstance.go('search_result');
            self.loadData(newval);
        });
        
      self.itemOnly = function(context)
                    {
                        return context['leaf'];
                    };
      self.selectTemplate = function(file, bindingContext)
                    {
                        return bindingContext.$itemContext.leaf ? 'item_template' : 'group_template';
                    };
      
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


     self.filterOrg = ko.observableArray([]);
     self.filterDate = ko.observableArray([]);
     
     self.currentId = ko.observable("HOLA");
     
     self.filterButtonClick = function(data, event){
         $( "#filter-panel" ).slideToggle();
     };
     
 
     
     self.loadData = function(id){
         dao.getSeachResults(id, function(data){
            console.log("ya llegamos y el valor  es" +id);
            /* self.formTest = document.getElementById('searchReturnForm');
     
            console.log("inputSearch Value!");
            console.log(self.formTest);
            
            self.formTest.addEventListener('currentIdLabel-changed', function(event){
                console.log("Ha habido un cambio =o");
            });   
            */
            
            console.log(data);
            self.dataSource(new oj.JsonTreeDataSource(data));
            
            
        });
     };
     self.loadData(localStorage.getItem("searchVal"));
     
     self.toDetail = function(event, data){
         console.log(event);
         console.log(data);
            localStorage.setItem("detailVal", event.id);
            console.log("el valor  es" +localStorage.getItem("detailVal"));
            oj.Router.rootInstance.go('history');
            
            console.log(document.searchResultViewModel);
     }
 
 
      
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
                  
    /*formTest.addEventListener( function(event) {
      console.log("Cambioo wee!");
    });*/
   
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed

      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    
          return new SearchResultViewModel();
  }
);
