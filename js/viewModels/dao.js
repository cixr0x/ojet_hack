/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout'],
 function(oj, ko, $) {


    
    function daoModel() {
        var self =this;
         self.typeLabel = {};
        self.typeLabel["subscription_plan"] = "Subscription Plan";
        self.typeLabel["oppty"] = "Opportunity";
        self.typeLabel["invoice"] = "Invoice";
        self.typeLabel["order"] = "Order";
        

        this.getSeachResults = function(id, callback){
    
    console.log("Im in  =3");
    var results = [];
    $.getJSON("js/mainDatasource.json", function(data){
       for (a in data){
           var itemId = data[a].id;
           var upperItem =itemId.toUpperCase();
           var upperId =id.toUpperCase();
           if (upperItem.includes(upperId)){
               results.push(data[a]);
           }
       }
       
       var hResults = {}; //Hierarchy results
       for (b in results){
           var itemType = results[b].type;
           console.log("Item type: "+itemType);
           
           var hItem = {}; 
               hItem["id"] = results[b].id;
               hItem["customer"] = results[b].customer;
               hItem["organization"] = results[b].org;
               hItem["created"] = results[b].created;
               
               
           if (hResults.hasOwnProperty(itemType)){    
               hResults[itemType].push(hItem);
               
           }else{
               hResults[itemType] = [];
               hResults[itemType].push(hItem);
           }
           
       }
       
       var resultArray = [];
       for (var key in hResults){
           var entry = {};
           entry.attr = {};
           entry.attr.id = key;
           
           entry.children = [];
           for (i in hResults[key]){
               var child = {};
               child.id = hResults[key][i].id;
               child.name = hResults[key][i].id;
               child.customer = hResults[key][i].customer;
               child.organization = hResults[key][i].organization;
               child.created = hResults[key][i].created;
               child.type = key;
               
               var childAttr = {};
               childAttr.attr =  child;
               entry.children.push(childAttr);
           }
           console.log(self.typeLabel);
           entry.attr.name = self.typeLabel[key] + " ("+entry.children.length+")";
           
           resultArray.push(entry);
       }
       console.log(resultArray);
       callback(resultArray);
   });
   
   
}

    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new daoModel();
  }
);