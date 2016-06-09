var xslt;
var select_color;
var select_back;

var original_color;
var original_back;
var hover;

var selected_item;

function loadSudokuPage() {
    document.getElementById("pwd").innerHTML =  "home/SUDOKU";
    document.getElementById("main-container").innerHTML = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = onPageRecived2;
    xmlhttp.open("GET", "http://ie.ce-it.ir/hw3/xml/sudoku.xml", false);
	//    xmlhttp.open("GET", "http://ceit.aut.ac.ir/~sepehr/ie/sudoku.xml", false);
    xmlhttp.send(null);
    document.getElementById("home-icon").style.display = "inline";
    document.getElementById("home-icon").onmousedown = loadHomePage;
	document.onkeypress = onTextselected;
	document.getElementById("check-sudoku").onmousedown  = validSudoku;
	document.getElementById("submit-sudoku").onmousedown  = sendToServer;
	

}


function onPageRecived2() {

    if (this.readyState == 4) {
        var responseXML = this.responseXML;
		var xmlDoc = responseXML.documentElement;
		select_color = responseXML.documentElement.getAttribute("selectedNumberColor");
		select_back = responseXML.documentElement.getAttribute("selectedNumberBackColor");
		hover = responseXML.documentElement.getAttribute("hover");
		
        displayResult(responseXML);
    }

}




function loadXMLDoc(filename) {
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    xhttp.onreadystatechange = function() {

        if (xhttp.status == 200 && xhttp.readyState == 4) {
            xslt = xhttp.responseXML;
        }
    };
    try {
        xhttp.responseType = "msxml-document";
    } catch (err) {} // Helping IE11
    xhttp.send(null);


}

function displayResult(xml) {

    document.getElementById("main-container").innerHTML = '';

    var xsl = loadXMLDoc("https://ceit.aut.ac.ir/~sepehr/sudoku.xml");
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        ex = xml.transformNode(xslt);
        document.getElementById("main-container").innerHTML = ex;
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {

        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslt);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById("main-container").appendChild(resultDocument);
    }
	
	var items = document.getElementsByClassName("sudoku-item");
	for(var i = 0 ; i < items.length ; i++){
		items[i].onmousedown = onTextselected;
		
		items[i].onkeyup = function() {selected_item = this; myKeyUp(event)};
        items[i].onkeypress = function() {selected_item = this; myKeyPress(event)};
		items[i].onmouseover = onmouseoveritem;
		items[i].onmouseout = onmouseoutitem;
		if(items[i].getAttribute("contenteditable"))
		{
			original_back = items[i].style.background;
			original_color = items[i].style.color;
		}
	}

}


function onTextselected(){

	var items = document.getElementsByClassName("sudoku-item");	
	
	for(var i = 0 ; i < items.length ; i++){
		if(items[i].innerHTML == this.innerHTML && items[i].innerHTML > 0)
		{
			items[i].style.color = select_color;
			items[i].style.background = select_back;
			
		}
		else{
			
			if(items[i].getAttribute("contenteditable"))
				{
					items[i].style.background = original_back ;
					items[i].style.color = original_color ;		
				}
			else{
					items[i].style.background = "white" ;
					items[i].style.color = original_color ;		
			}
		}
	}
}




function validSudoku() {
	items = document.getElementById("sudoku").getElementsByTagName("tr");
	
	var data = [0];
	var rows = [0];
	for(var r = 0 ; r < items.length ; r++ )
	{
		for(var c = 0 ; c < items[r].getElementsByTagName("td").length ; c++)
		{
			rows[c] = items[r].getElementsByTagName("td")[c].innerHTML;
		}
		data[r] = rows;
		rows = [0];
	}

    var valid = true, 
        temp = [], 
        data,
        side,
        slot;

	//console.log(data);
    // Check wrong size
    if (data[0].length !== data.length) valid = false;
	
    // slot*slot
    slot = Math.sqrt(data.length);

    // Verifiy horizontal
	for(var i = 0 ; i < 9 ; i++)
		for(var j = 0 ; j < 9 ; j++)
			for(var k  = 0 ; k < 9 ; k++)
				if(data[i][j] == data[i][k] && k != j || data[i][j] == 0 ){
					for(var l = 0 ; l<9 ; l++)
					{
						items[i].getElementsByTagName("td")[l].style.background = "orange";
					}
					valid = false;
				}
				


	for(var i = 0 ; i < 9 ; i++)
		for(var j = 0 ; j < 9 ; j++)
			for(var k  = 0 ; k < 9 ; k++)
				if(data[j][i] == data[k][i] && k != j){
					for(var l = 0 ; l<9 ; l++)
					{
						items[l].getElementsByTagName("td")[i].style.background = "orange";
					}
					valid = false;
				}
				
	
	var boxes = [
	[0,1,2,9,10,11,18,19,20],
	[3,4,5,12,13,14,21,22,23],
	[6,7,8,15,16,17,24,25,26],
	[27,28,29,36,37,38,45,46,47],
	[30,31,32,39,40,41,48,49,50],
	[33,34,35,42,43,44,51,52,53],
	[54,55,56,63,64,65,72,73,74],
	[57,58,59,66,67,68,75,76,77],
	[60,61,62,69,70,71,78,79,80]
	];
    // Verifiy boxes
		items = document.getElementById("sudoku").getElementsByTagName("td");
	for(var i = 0 ; i<9 ; i++)
		for(var j =0 ; j < 9 ; j++ )
			for(var k = 0 ; k < 9 ;k++){
				console.log(boxes[i][j]);
				if(items[boxes[i][j]].innerHTML == items[boxes[i][k]].innerHTML && j != k){
					//window.alert(i +" "+boxes[i][j]+" " +boxes[i][k]);
					for(var l = 0 ; l<9 ; l++)
					{
						items[boxes[i][l]].style.background = "orange";
					}
					valid = false;
				}
			}
			
		
	window.alert(valid);
    return valid
}

var old_value;

 function myKeyPress(e){
    var keynum;
    if(window.event) { // IE
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
      keynum = e.which;
    }

     old_value = selected_item.innerHTML;

	if( selected_item.innerHTML > 0 ){
		selected_item.innerHTML = "";
	}


 }

function myKeyUp(e){
    var keynum;
    if(window.event) { // IE
        keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
        keynum = e.which;
    }

    if((keynum > 57 || keynum < 49 ) && keynum != 8 && keynum != 46 ){
        selected_item.innerHTML = old_value;
    }

}

function sendToServer(){
		items = document.getElementById("sudoku").getElementsByTagName("tr");
		var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		xml += "<solution xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"http://ie.ce-it.ir/hw3/sudoku_solution.xsd\">";
		xml += "<cells>";
		for(var j = 0 ; j< 9; j++)
		for(var i = 0; i < 9 ; i++)
			//if(items[i].innerHTML == 0)
			{
				xml+="<cell posval=\""+parseInt(parseInt(j)*100+parseInt(i)*10+parseInt(items[j].getElementsByTagName("td")[i].innerHTML))+"\">";
				xml+=items[j].getElementsByTagName("td")[i].innerHTML;
				xml+="</cell>";
				//window.alert("khalie");
				//return 0;
			}
			xml+="</cells>";
			xml+="<student id=\"9231011\">9231011</student>";
			xml+=" </solution>";
		//	window.alert(xml);
			 var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = solutionRecived;
			xmlhttp.open("POST", "http://ie.ce-it.ir/hw3/sudoku_validator.php", false);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			var parms = "solution_xml="+xml;
			console.log(parms);
			xmlhttp.send(parms);
		
}

function solutionRecived(){
	if(this.status == 200)
	window.alert(this.responseText);
}


function onmouseoveritem(){
	//window.alert("over");
	if(	this.style.background != select_back)
	this.style.background = hover;
}

function onmouseoutitem(){
	if(	this.style.background == select_back)
		return;
				if(this.getAttribute("contenteditable"))
				{
					this.style.background = original_back ;
					this.style.color = original_color ;		
				}
			else{
					this.style.background = "white" ;
					this.style.color = original_color ;		
			}
}
