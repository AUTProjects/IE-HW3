
window.onload = loadHomePage;

function loadHomePage(){
		document.getElementById("main-container").innerHTML = '';
		document.getElementById("pwd").innerHTML = "HOME";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = onPageRecived;
	xmlhttp.open("GET","https://pi0.ir/ie/home.xml/",false);
	xmlhttp.send(null);

}

function onPageRecived(){
	if(this.readyState == 4){
			var responseXML = this.responseXML;
			var xmlDoc = responseXML.documentElement;

			document.getElementsByTagName("header")[0].style.background =
			xmlDoc.getElementsByTagName("background")[0].childNodes[0].nodeValue;

			document.getElementById("pwd").style.color =
			xmlDoc.getElementsByTagName("pwd")[0].childNodes[0].nodeValue;

			document.getElementById("games").style.color =
			xmlDoc.getElementsByTagName("gameicon")[0].getAttribute("color");

			document.getElementById("home-icon").style.display="none";

			var game = xmlDoc.getElementsByTagName("game");
			var i = 0 ;

			var max = [0,0];

			for(; i < game.length-1 ; i++)
			{
				var online   = xmlDoc.getElementsByTagName("onlines")[i].childNodes[0].nodeValue;
				var name  = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
				var _image = xmlDoc.getElementsByTagName("image")[i].childNodes[0].nodeValue;
				var _text = xmlDoc.getElementsByTagName("text")[i];

				if(max[0] < online)
				{
					max[1] = i;
					max[0] = online;
				}
				var li = document.createElement("li");
				li.className = "dropdown";
				li.innerHTML = name;
				li.style.display = "none";
				document.getElementById("games").appendChild(li);

				addGame(online,name,_image,_text);
			}

			document.getElementsByClassName("game-block")[max[1]].style.background =
			xmlDoc.getElementsByTagName("games")[0].getAttribute("max-onlines-background");
			document.getElementsByClassName("game-block")[max[1]].style.borderColor =
			xmlDoc.getElementsByTagName("games")[0].getAttribute("max-onlines-border-color");
			document.getElementsByClassName("game-block")[max[1]].style.borderWidths =
			xmlDoc.getElementsByTagName("games")[0].getAttribute("max-onlines-border-width");
			document.getElementsByClassName("game-block")[max[1]].style.borderStyle =
			xmlDoc.getElementsByTagName("games")[0].getAttribute("max-onlines-border-style");

			//	document.getElementById("games").getElementsByTagName("li")[0].onmouseup= dropdown;
			//	window.onmousedown= dropup;


	}
}

function addGame(data_onlines,game_name,image_src,game_text){

			var div  = document.createElement("div");
			div.className = "game-block";
			div.id = game_name + "-block";
			div.setAttribute("data-onlines",data_onlines);
			div.setAttribute("data-name", game_name);
			var div2 = document.createElement("div");
			div2.className = "game-image-container";
			div.appendChild(div2);
			var img = document.createElement("img");
			img.setAttribute("src",image_src);
			document.getElementById("main-container").appendChild(div);
			div2.appendChild(img);
			div.onmousedown = onGameClick;
			var p =  document.createElement("p");
			p.innerHTML = game_text.childNodes[0].nodeValue;
			p.style.color = game_text.getAttribute("color");
			div.appendChild(p);
}


function dropdown(){

	for(var i = 0 ; i < document.getElementsByClassName("dropdown").length ; i++){
		document.getElementsByClassName("dropdown")[i].style.display = "block";
	}
}



function dropup(){
		for(var i = 0 ; i < document.getElementsByClassName("dropdown").length ; i++){
		document.getElementsByClassName("dropdown")[i].style.display = "none";
	}

}


function onGameClick(){
	
	if(this.id == "sudoku-block"){
		loadSudokuPage();
	} 	
	
}