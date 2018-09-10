
window.onload=function(){
var productsforms=document.getElementsByClassName("products");
    for(let index=0;index<productsforms.length;index++){
productsforms[index].style.display="none";
    }
};
function GetDetails(productype){
	  	   document.getElementById("products").innerHTML="";
  var xhttp = new XMLHttpRequest();
   var tables=document.createElement("table");
  xhttp.onload = function() {
 var objkeys;
 var objvalues;
if (this.readyState == 4 && this.status == 200) {
		
		var data = JSON.parse(this.responseText);
			objkeys=Object.keys(data[0]);
		    objvalues=Object.values(data[0]);
		var col,row;
		 row = document.createElement("tr");
		for(let  objectindex=0;objectindex<objkeys.length;objectindex++)
		                    {
		          		 col = document.createElement("td");
						var node = document.createTextNode(objkeys[objectindex]);
			           col.appendChild(node);
				       
					
					 row.appendChild(col);
} 
	                      tables.appendChild(row);
			for(let i = 0; i < data.length; i++)
			{
			objkeys=Object.keys(data[i]);
			objvalues=Object.values(data[i]);
		        // console.log(Object.keys(data[i]));
				 //c onsole.log(Object.values(data[i]));
				 var row = document.createElement("tr");
		          var col;
		          for(let  objectindex=0;objectindex<objkeys.length;objectindex++)
		          {
			
						var nodekey= document.createTextNode(objkeys[objectindex]);
						col = document.createElement("td");
						var node = document.createTextNode(objvalues[objectindex]);

						col.appendChild(node);
				        row.appendChild(col);
				       
		           }

    
                tables.appendChild(row);
                var bookbutton=document.createElement("button");
                var b='book'+[i+1];
                 bookbutton.setAttribute("id",b);

                 var nodebutton=document.createTextNode("Book");
                 bookbutton.appendChild(nodebutton);
                 row.appendChild(bookbutton);
                   var savebutton=document.createElement("button");
                var sv='save'+[i+1];
                 savebutton.setAttribute("id",sv);

                 var nodesave=document.createTextNode("Save");
                 savebutton.appendChild(nodesave);
                 row.appendChild(savebutton);

                tables.appendChild(row);
                  document.getElementById("products").appendChild(tables);
                  document.getElementById(b).addEventListener("click",function(){
                  	bookproduct(data[i].Id,productype);
                  });
                   document.getElementById(sv).addEventListener("click",function(){
                  	saveproduct(data[i].Id,productype);
                  });
                          }
           }
          
  };
 
   //crossDomain: true;
   xhttp.open("GET", "http://localhost:63938/api/"+productype ,true);
   xhttp.send();
}
 function bookproduct(ids,valtype){
           	var xhttp = new XMLHttpRequest();
                  json={
                  	"id":ids,
                  	"type":"book"
                  }
                  json=JSON.stringify(json);
                     xhttp.open("GET", "http://localhost:63938/api/"+valtype ,true);

  xhttp.onload=function(){


GetDetails(valtype);
}
xhttp.setRequestHeader("Content-type", "application/json;charset=utf-8");
   xhttp.send(json);
           }
             function saveproduct(ids,valtype){
             	 	var xhttp = new XMLHttpRequest();
             	   json={
                  	"id":ids,
                  	"type":"save"
                  }

           json=JSON.stringify(json);
                     xhttp.open("GET", "http://localhost:63938/api/"+valtype ,true);

  xhttp.onload=function(){
GetDetails(valtype);      
           	
           }
           xhttp.setRequestHeader("Content-type", "application/json;charset=utf-8");
   xhttp.send(json);
           }




function displays(event,productform){

var productsforms=document.getElementsByClassName("products");
    for(let index=0;index<productsforms.length;index++){
productsforms[index].style.display="none";
    }
document.getElementById(productform).style.display="block";
}

function PostDetails(productype,formid) {
	var xhttp = new XMLHttpRequest();
	var jsonObject={
	};

	var formvalues=document.getElementById(formid).elements.length;
	
	var formv=document.getElementById(formid).elements;
 for(let index =0;index<formvalues;index++)
{

	var x=document.getElementById(formid).elements.item(index).getAttribute("name");
	

//var x=formv[index].getAttribute("name");
jsonObject[x]=document.getElementById(formid).elements.item(index).value;
}
alert(jsonObject);
xhttp.open("POST", "http://localhost:63938/api/"+ productype, true);
xhttp.setRequestHeader("Content-type", "application/json;charset=utf-8");
   xhttp.send( JSON.stringify(jsonObject));
}




