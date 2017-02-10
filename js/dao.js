/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function getSeachResults(id, callback){
    
    $.getJSON("mainDatasource.json", function(data){
       for (a in data){
           if (id = data[a].id){
               
           }
       }
       
       callback(responseJson);
   });
   
   
}