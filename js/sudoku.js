var xslt;
var select_color;
var select_back;

var original_color;
var original_back;

var selected_item;

function loadSudokuPage() {
    document.getElementById("pwd").innerHTML = document.getElementById("pwd").innerHTML + "/SUDOKU";
    document.getElementById("main-container").innerHTML = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = onPageRecived2;
    xmlhttp.open("GET", "http://ie.ce-it.ir/hw3/xml/sudoku.xml", false);
    xmlhttp.send(null);
    document.getElementById("home-icon").style.display = "inline";
    document.getElementById("home-icon").onmousedown = loadHomePage;
	document.onkeypress = onTextselected;
	document.getElementById("check-sudoku").onmousedown  = validSudoku;
	

}


function onPageRecived2() {

    if (this.readyState == 4) {
        var responseXML = this.responseXML;
		var xmlDoc = responseXML.documentElement;
		select_color = responseXML.documentElement.getAttribute("selectedNumberColor");
		select_back = responseXML.documentElement.getAttribute("selectedNumberBackColor");
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
			rows[r] = items[r].getElementsByTagName("td")[c].innerHTML
		}
		data[r] = rows;
		rows = [0];
	}

	data = [
  [7,8,4, 1,5,9, 3,2,6],
  [5,3,9, 6,7,2, 8,4,1],
  [6,1,2, 4,3,8, 7,5,9],

  [9,2,8, 7,1,5, 4,6,3],
  [3,5,7, 8,4,6, 1,9,2],
  [4,6,1, 9,2,3, 5,8,7],

  [8,7,6, 3,9,4, 2,1,5],
  [2,4,3, 5,6,1, 9,7,8],
  [1,9,5, 2,8,7, 6,3,4]
];
    var valid = true, 
        temp = [], 
        data,
        side,
        slot;


    // Check wrong size
    if (data[0].length !== data.length) valid = false;

    // slot*slot
    slot = Math.sqrt(data.length);

    // Verifiy horizontal
    data.forEach(function(arr) {
        valid = valid && arr.every(function(val, i) { return arr.indexOf(i + 1) > -1; });
    });

    // Verifiy vertical lines
    data.forEach(function(arr, i) {
        temp  = data.map(function(val) { return val[i]; });
        valid = valid && arr.every(function(val, i) { return temp.indexOf(i + 1) > -1; });
    });

    // Verifiy boxes
    for (var i = 0; i < slot; i++) {

        data.forEach(function(val, e) {
            side  = val.slice(slot * i, slot * i + slot);
            temp  = temp.concat(side);

            if ((e+1) % slot == 0 && e > 0) {
                for (var j = 1; j <= data.length; j++)
                    if (temp.indexOf(j) < 0) valid = false;                 
                temp = [];
            }

        });

    }
    return valid;
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