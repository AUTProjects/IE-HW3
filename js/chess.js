

function loadChessPage(){

    document.getElementById("main-container").innerHTML = '';
    document.getElementById("pwd").innerHTML = "HOME" + "/CHESS";
    document.getElementById("home-icon").style.display = "inline";
    document.getElementById("home-icon").onmousedown = loadHomePage;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = onPageRecived3;
	xmlhttp.open("GET","http://ie.ce-it.ir/hw3/xml/chess.xml",false);
	xmlhttp.send(null);

}

function onPageRecived3(){

	if(this.readyState == 4){
		var responseXML = this.responseXML;
		var xmlDoc = responseXML.documentElement;
	
	var chess_div = document.createElement("div");
		chess_div.id = "chess";
		document.getElementById("main-container").appendChild(chess_div);
	
	var info_div = document.createElement("div");
		info_div.className = "chess-info";
		chess_div.appendChild(info_div);
	
	var white_score_div = document.createElement("div");
		white_score_div.className = "score";
		white_score_div.innerHTML = "white score: <span id=\"white-score\">5</span>";
		info_div.appendChild(white_score_div);

	
	var turn_div = document.createElement("div");
		turn_div.className = "black";
		turn_div.id = "turn";
		turn_div.innerHTML = "black";
		info_div.appendChild(turn_div);
		
	var black_score_div = document.createElement("div");
		black_score_div.className = "score";
		black_score_div.innerHTML = "black score: <span id=\"black-score\">5</span>";
		info_div.appendChild(black_score_div);
	
		
	var white = xmlDoc.getElementsByTagName("board")[0].getAttribute("white-cells");
	var black = xmlDoc.getElementsByTagName("board")[0].getAttribute("black-cells");
		
	var panel_div1 = document.createElement("div");
		panel_div1.id = "white-chessman-panel";
		chess_div.appendChild(panel_div1);
	
	
	var table = document.createElement("table");              
		for(var i = 0 ; i < 8 ; i++){	                      
			var tr = document.createElement("tr");            
			table.appendChild(tr);                            
			                                                  
			                                                  
	                                                          
			for(var j = 0 ; j < 8 ; j++ )                     
			{                                                 
				var td = document.createElement("td");        
				                                              
				if(i%2==0)                                    
					if(j%2==0)                                
						td.style.background = white;          
					else                                      
						td.style.background = black;          
				else                                          
					if(j%2!=0)                                
						td.style.background = white;          
					else                                      
						td.style.background = black;
						
				tr.appendChild(td);
			}
		}
		chess_div.appendChild(table);
	
	
	var panel_div2 = document.createElement("div");
		panel_div2.id = "black-chessman-panel";
		chess_div.appendChild(panel_div2);
	
		panel_div1.style.background = white;
		panel_div2.style.background = black;
		
		
		var pawn = 8 ,
			rook = 2 ,
			knight = 1,
			queen = 1,
			king =1,
			bishop = 2;
		
		var white_player = 	xmlDoc.getElementsByTagName("white")[0];
		var children = white_player.children;
		var tds = document.getElementsByTagName("td");
		for(var j = 0 ; j < children.length ; j++){
				//if(children[j].nodeName = "pawn")
					var index = parseInt(children[j].getAttribute("row"))* 8 + parseInt(children[j].getAttribute("col"));
					if(children[j].nodeName == "pawn"){
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
					tds[index].style.color = "white";
					pawn--;
					}                                                                                                                                
					else if (children[j].nodeName == "rook"){                                                                                        
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");     
					tds[index].style.color = "white";
					rook--;
					}                                                                                                                                
					else if (children[j].nodeName == "knight"){                                                                                      
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");    
					tds[index].style.color = "white";
					knight--;
					}                                                                                                                                
					else if (children[j].nodeName == "queen"){                                                                                       
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");     
					tds[index].style.color = "white";
					queen--;
					}                                                                                                                                
					else if (children[j].nodeName == "king"){                                                                                        
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");      
					tds[index].style.color = "white";
					king--;
					}                                                                                                                                
					else if (children[j].nodeName == "bishop"){                                                                                      
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");    
					tds[index].style.color = "white";
					bishop--;																												
					}
		}	
		
		for(var i = pawn ; i > 0 ; i--)
			panel_div1.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
		for(var i = rook ; i > 0 ; i--)
			panel_div1.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");
		for(var i = knight ; i > 0 ; i--)
			panel_div1.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");
		for(var i = queen ; i > 0 ; i--)
			panel_div1.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");
		for(var i = king ; i > 0 ; i--)
			panel_div1.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");
		for(var i = bishop ; i > 0 ; i--)
			panel_div1.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");
		
		var pawn = 8 ,
			rook = 2 ,
			knight = 1,
			queen = 1,
			king =1,
			bishop = 2;
		
		
		var black_player = 	xmlDoc.getElementsByTagName("black")[0];
		children = black_player.children;
		for(var j = 0 ; j < children.length ; j++){
				//if(children[j].nodeName = "pawn")
					 index = parseInt(children[j].getAttribute("row"))* 8 + parseInt(children[j].getAttribute("col"));
					if(children[j].nodeName == "pawn"){
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
						pawn--;
					}
					else if (children[j].nodeName == "rook"){
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");
						rook--;
					}
					else if (children[j].nodeName == "knight"){
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");
					knight--;
					}
					else if (children[j].nodeName == "queen"){
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");
					queen--;
					}
					else if (children[j].nodeName == "king"){
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");
					king--;
					}
					else if (children[j].nodeName == "bishop"){
					tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");
					bishop--;
					}
				
		}	
		
		panel_div2.style.color = "black";
		for(var i = pawn ; i > 0 ; i--)
			panel_div2.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
		for(var i = rook ; i > 0 ; i--)
			panel_div2.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");
		for(var i = knight ; i > 0 ; i--)
			panel_div2.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");
		for(var i = queen ; i > 0 ; i--)
			panel_div2.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");
		for(var i = king ; i > 0 ; i--)
			panel_div2.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");
		for(var i = bishop ; i > 0 ; i--)
			panel_div2.innerHTML = panel_div1.innerHTML+xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");
		
	
	//    document.getElementById("chess").style.transform = "rotate(180deg)"; 
	}
}


