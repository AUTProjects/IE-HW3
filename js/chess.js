	var pawn, rook, knight, queen, king, bishop;
	var tds;
	var white, black;
	var turn;


	function loadChessPage() {

	    document.getElementById("main-container").innerHTML = '';
	    document.getElementById("pwd").innerHTML = "HOME" + "/CHESS";
	    document.getElementById("home-icon").style.display = "inline";
	    document.getElementById("home-icon").onmousedown = loadHomePage;
	    var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = onPageRecived3;
	    xmlhttp.open("GET", "http://ie.ce-it.ir/hw3/xml/chess.xml", false);
	    xmlhttp.send(null);

	}

	function onPageRecived3() {

	    if (this.readyState == 4) {
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
	        white_score_div.innerHTML = "white score: <span id=\"white-score\">" + xmlDoc.getElementsByTagName("score")[0].getElementsByTagName("white")[0].innerHTML + "</span>";
	        info_div.appendChild(white_score_div);


	        var turn_div = document.createElement("div");
	        turn_div.className = "black";
	        turn_div.id = "turn";
	        turn = xmlDoc.getAttribute("turn");
	        turn_div.innerHTML = turn;
	        info_div.appendChild(turn_div);

	        var black_score_div = document.createElement("div");
	        black_score_div.className = "score";
	        black_score_div.innerHTML = "black score: <span id=\"black-score\">" + xmlDoc.getElementsByTagName("score")[0].getElementsByTagName("black")[0].innerHTML + "</span>";
	        info_div.appendChild(black_score_div);


	        white = xmlDoc.getElementsByTagName("board")[0].getAttribute("white-cells");
	        black = xmlDoc.getElementsByTagName("board")[0].getAttribute("black-cells");

	        var panel_div1 = document.createElement("div");
	        panel_div1.id = "white-chessman-panel";
	        chess_div.appendChild(panel_div1);


	        var table = document.createElement("table");
	        for (var i = 0; i < 8; i++) {
	            var tr = document.createElement("tr");
	            table.appendChild(tr);



	            for (var j = 0; j < 8; j++) {
	                var td = document.createElement("td");

	                if (i % 2 == 0)
	                    if (j % 2 == 0)
	                        td.style.background = white;
	                    else
	                        td.style.background = black;
	                else
	                if (j % 2 != 0)
	                    td.style.background = white;
	                else
	                    td.style.background = black;

	                td.onmousedown = itemSelected;
					td.onmouseup = checkAgain;
	                tr.appendChild(td);
	            }
	        }
	        chess_div.appendChild(table);


	        var panel_div2 = document.createElement("div");
	        panel_div2.id = "black-chessman-panel";
	        chess_div.appendChild(panel_div2);

	        panel_div1.style.background = white;
	        panel_div2.style.background = black;


	        pawn = 8,
	            rook = 2,
	            knight = 1,
	            queen = 1,
	            king = 1,
	            bishop = 2;

	        var white_player = xmlDoc.getElementsByTagName("white")[0];
	        var children = white_player.children;
	        tds = document.getElementsByTagName("td");
	        for (var j = 0; j < children.length; j++) {
	            //if(children[j].nodeName = "pawn")
	            var index = parseInt(children[j].getAttribute("row")) * 8 + parseInt(children[j].getAttribute("col"));
	            if (children[j].nodeName == "pawn") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
	                tds[index].style.color = "white";
	                pawn--;
	            } else if (children[j].nodeName == "rook") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");
	                tds[index].style.color = "white";
	                rook--;
	            } else if (children[j].nodeName == "knight") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");
	                tds[index].style.color = "white";
	                knight--;
	            } else if (children[j].nodeName == "queen") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");
	                tds[index].style.color = "white";
	                queen--;
	            } else if (children[j].nodeName == "king") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");
	                tds[index].style.color = "white";
	                king--;
	            } else if (children[j].nodeName == "bishop") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");
	                tds[index].style.color = "white";
	                bishop--;
	            }
	        }

	        for (var i = pawn; i > 0; i--)
	            panel_div1.innerHTML = panel_div1.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
	        for (var i = rook; i > 0; i--)
	            panel_div1.innerHTML = panel_div1.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");
	        for (var i = knight; i > 0; i--)
	            panel_div1.innerHTML = panel_div1.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");
	        for (var i = queen; i > 0; i--)
	            panel_div1.innerHTML = panel_div1.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");
	        for (var i = king; i > 0; i--)
	            panel_div1.innerHTML = panel_div1.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");
	        for (var i = bishop; i > 0; i--)
	            panel_div1.innerHTML = panel_div1.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");

	        pawn = 8,
	            rook = 2,
	            knight = 1,
	            queen = 1,
	            king = 1,
	            bishop = 2;


	        var black_player = xmlDoc.getElementsByTagName("black")[0];
	        children = black_player.children;
	        for (var j = 0; j < children.length; j++) {
	            //if(children[j].nodeName = "pawn")
	            index = parseInt(children[j].getAttribute("row")) * 8 + parseInt(children[j].getAttribute("col"));
	            if (children[j].nodeName == "pawn") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
	                tds[index].style.color = "black";
	                pawn--;
	            } else if (children[j].nodeName == "rook") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");
	                tds[index].style.color = "black";
	                rook--;
	            } else if (children[j].nodeName == "knight") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");
	                tds[index].style.color = "black";
	                knight--;
	            } else if (children[j].nodeName == "queen") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");
	                tds[index].style.color = "black";
	                queen--;
	            } else if (children[j].nodeName == "king") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");
	                tds[index].style.color = "black";
	                king--;
	            } else if (children[j].nodeName == "bishop") {
	                tds[index].innerHTML = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");
	                tds[index].style.color = "black";
	                bishop--;
	            }

	        }

	        panel_div2.style.color = "black";
	        for (var i = pawn; i > 0; i--)
	            panel_div2.innerHTML = panel_div2.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode");
	        for (var i = rook; i > 0; i--)
	            panel_div2.innerHTML = panel_div2.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode");
	        for (var i = knight; i > 0; i--)
	            panel_div2.innerHTML = panel_div2.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode");
	        for (var i = queen; i > 0; i--)
	            panel_div2.innerHTML = panel_div2.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode");
	        for (var i = king; i > 0; i--)
	            panel_div2.innerHTML = panel_div2.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode");
	        for (var i = bishop; i > 0; i--)
	            panel_div2.innerHTML = panel_div2.innerHTML + xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");


	        pawn = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("pawn")[0].getAttribute("unicode"),
	            rook = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("rook")[0].getAttribute("unicode"),
	            knight = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("knight")[0].getAttribute("unicode"),
	            queen = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("queen")[0].getAttribute("unicode"),
	            king = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("king")[0].getAttribute("unicode"),
	            bishop = xmlDoc.getElementsByTagName("chessmans")[0].getElementsByTagName("bishop")[0].getAttribute("unicode");


	    }
	}
	var selected = null;

	function itemSelected(p) {

		
	    var elementPos = getIndex(this);
	    if (selected == null || selected.style.color == this.style.color) {
	        //	refreshTable();
	        if (turn != this.style.color)
	            return;
	        refreshTable();
	        selected = this;
	        switch (this.innerHTML) {
	            case pawn:
	                {
	                    //	window.alert(elementPos);


	                    if (this.style.color == "white") {
	                        if (Math.round(elementPos / 8 + 0.5) != 1) {
	                            if (tds[elementPos - 8].innerHTML == "") {
	                                setcolor(tds[elementPos - 8]);
									
	                                if (tds[elementPos - 16].innerHTML == "" && Math.round(elementPos / 8 + 0.5) == 7) {
	                                          setcolor(tds[elementPos - 16]);
	                                }
	                            }
	                            if (elementPos % 8 != 0 && elementPos % 8 != 7) {
	                                if (tds[elementPos - 7].innerHTML != "" && tds[elementPos - 7].style.color != "white")
	                                         setcolor(tds[elementPos - 7]);
	                                if (tds[elementPos - 9].innerHTML != "" && tds[elementPos - 9].style.color != "white")
	                                         setcolor(tds[elementPos - 9]);
	                            }
	                            if (elementPos % 8 == 0)
	                                if (tds[elementPos - 7].innerHTML != "" && tds[elementPos - 7].style.color != "white")
	                                       setcolor(tds[elementPos - 7]);
	                            if (elementPos % 8 == 7)
	                                if (tds[elementPos - 9].innerHTML != "" && tds[elementPos - 9].style.color != "white")
	                                        setcolor(tds[elementPos - 9]);
	                        } else {
	                           setcolor(tds[elementPos - 8]);
	                            if (Math.round(elementPos / 8 + 0.5) == 2) {
	                                //todo
	                            }
	                        }
	                    } else {
	                        if (Math.round(elementPos / 8 + 0.5) != 8) {
	                            if (tds[elementPos + 8].innerHTML == "") {
	                                      setcolor(tds[elementPos + 8]);
	                                if (tds[elementPos + 16].innerHTML == "" && Math.round(elementPos / 8 + 0.5) == 2) {
	                                      setcolor(tds[elementPos + 16]);
	                                }
	                            }
	                            if (elementPos % 8 != 0 && elementPos % 8 != 7) {
	                                if (tds[elementPos + 7].innerHTML != "" && tds[elementPos + 7].style.color == "white")
	                                          setcolor(tds[elementPos + 7]);
	                                if (tds[elementPos + 9].innerHTML != "" && tds[elementPos + 9].style.color == "white")
	                                          setcolor(tds[elementPos + 9]);
	                            }
	                            if (elementPos % 8 == 0)
	                                if (tds[elementPos + 7].innerHTML != "" && tds[elementPos + 7].style.color == "white")
	                                          setcolor(tds[elementPos + 7]);
	                            if (elementPos % 8 == 7)
	                                if (tds[elementPos + 9].innerHTML != "" && tds[elementPos + 9].style.color == "white")
	                                          setcolor(tds[elementPos + 9]);
	                        } else {
	                          setcolor(tds[elementPos + 8]);
	                            if (Math.round(elementPos / 8 + 0.5) == 2) {
	                                //todo
	                            }
	                        }
	                    }
	                }

	                break;
	            case knight:
	                {
	                    if (elementPos - 17 > 0 && elementPos % 8 != 0 && Math.round(elementPos / 8 + 0.5) > 2 && (tds[elementPos - 17].innerHTML == "" || tds[elementPos - 17].style.color != this.style.color))
	                              setcolor(tds[elementPos - 17]);
	                    if (elementPos - 15 > 0 && elementPos % 8 != 7 && Math.round(elementPos / 8 + 0.5) > 2 && (tds[elementPos - 15].innerHTML == "" || tds[elementPos - 15].style.color != this.style.color))
	                              setcolor(tds[elementPos - 15]);
	                    if (elementPos - 6 > 0 && elementPos % 8 < 6 && Math.round(elementPos / 8 + 0.5) != 1 && (tds[elementPos - 6].innerHTML == "" || tds[elementPos - 6].style.color != this.style.color))
	                              setcolor(tds[elementPos - 6]);
	                    if (elementPos - 10 > 0 && elementPos % 8 > 1 && Math.round(elementPos / 8 + 0.5) != 1 && (tds[elementPos - 10].innerHTML == "" || tds[elementPos - 10].style.color != this.style.color))
	                              setcolor(tds[elementPos - 10]);


	                    if (elementPos + 17 < 64 && elementPos % 8 != 7 && Math.round(elementPos / 8 + 0.5) < 7 && (tds[elementPos + 17].innerHTML == "" || tds[elementPos + 17].style.color != this.style.color))
	                              setcolor(tds[elementPos + 17]);
	                    if (elementPos + 15 < 64 && elementPos % 8 != 0 && Math.round(elementPos / 8 + 0.5) < 7 && (tds[elementPos + 15].innerHTML == "" || tds[elementPos + 15].style.color != this.style.color))
	                              setcolor(tds[elementPos + 15]);
	                    if (elementPos + 6 > 0 && elementPos % 8 > 1 && Math.round(elementPos / 8 + 0.5) != 8 && (tds[elementPos + 6].innerHTML == "" || tds[elementPos + 6].style.color != this.style.color))
	                              setcolor(tds[elementPos + 6]);
	                    if (elementPos + 10 > 0 && elementPos % 8 < 6 && Math.round(elementPos / 8 + 0.5) != 8 && (tds[elementPos + 10].innerHTML == "" || tds[elementPos + 10].style.color != this.style.color))
	                              setcolor(tds[elementPos + 10]);
	                }
	                break;
	            case rook:
	                {
	                    var i = elementPos + 8;
	                    //window.alert(i);
	                    while (i < 64) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                     setcolor(tds[i]);
	                            break;
	                        }
	                              setcolor(tds[i]);
	                        i += 8;
	                    }


	                    var i = elementPos - 8;
	                    //window.alert(i);
	                    while (i > 0) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                      setcolor(tds[i]);
	                            break;
	                        }
	                                      setcolor(tds[i]);
	                        i -= 8;
	                    }


	                    var i = elementPos + 1;
	                    //window.alert(i);
	                    while (Math.round(i / 8 + 0.5) == Math.round(elementPos / 8 + 0.5)) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                              setcolor(tds[i]);
	                            break;
	                        }
	                                      setcolor(tds[i]);
	                        i++;
	                    }
	                    var i = elementPos - 1;
	                    //window.alert(i);
	                    while (Math.round(i / 8 + 0.5) == Math.round(elementPos / 8 + 0.5)) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                              setcolor(tds[i]);
	                            break;
	                        }
	                                      setcolor(tds[i]);
	                        i--;
	                    }
	                }
	                break;

	            case bishop:
	                {
	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r - 1) * 8 + c + 1;
	                    //window.alert(i);
	                    while (i > 0 && elementPos % 8 < i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                              setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r--;
	                        c++;
	                        i = r * 8 + c;
	                    }


	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r - 1) * 8 + c - 1;
	                    //window.alert(i);
	                    while (i >= 0 && elementPos % 8 > i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r--;
	                        c--;
	                        i = r * 8 + c;

	                    }

	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r + 1) * 8 + c + 1;
	                    //window.alert(i);
	                    while (i < 64 && elementPos % 8 < i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r++;
	                        c++;
	                        i = r * 8 + c;

	                    }


	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r + 1) * 8 + c - 1;
	                    //window.alert(i);
	                    while (i < 64 && elementPos % 8 > i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r++;
	                        c--;
	                        i = r * 8 + c;

	                    }
	                }
	                break;

	            case queen:
	                {

	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r - 1) * 8 + c + 1;
	                    //window.alert(i);
	                    while (i > 0 && elementPos % 8 < i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r--;
	                        c++;
	                        i = r * 8 + c;
	                    }


	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r - 1) * 8 + c - 1;
	                    //window.alert(i);
	                    while (i >= 0 && elementPos % 8 > i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r--;
	                        c--;
	                        i = r * 8 + c;

	                    }

	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r + 1) * 8 + c + 1;
	                    //window.alert(i);
	                    while (i < 64 && elementPos % 8 < i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r++;
	                        c++;
	                        i = r * 8 + c;

	                    }


	                    var r = Math.round(elementPos / 8 + 0.5) - 1;
	                    var c = elementPos % 8;
	                    var i = (r + 1) * 8 + c - 1;
	                    //window.alert(i);
	                    while (i < 64 && elementPos % 8 > i % 8) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        r++;
	                        c--;
	                        i = r * 8 + c;

	                    }

	                    var i = elementPos + 8;
	                    //window.alert(i);
	                    while (i < 64) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        i += 8;
	                    }


	                    var i = elementPos - 8;
	                    //window.alert(i);
	                    while (i > 0) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        i -= 8;
	                    }


	                    var i = elementPos + 1;
	                    //window.alert(i);
	                    while (Math.round(i / 8 + 0.5) == Math.round(elementPos / 8 + 0.5)) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        i++;
	                    }
	                    var i = elementPos - 1;
	                    //window.alert(i);
	                    while (Math.round(i / 8 + 0.5) == Math.round(elementPos / 8 + 0.5)) {
	                        if (tds[i].innerHTML != "") {
	                            if (tds[i].style.color != this.style.color)
	                                setcolor(tds[i]);
	                            break;
	                        }
	                        setcolor(tds[i]);
	                        i--;
	                    }
	                }
	                break;
	            case king:
	                {
	                    if (Math.round(elementPos / 8 + 0.5) != 1)
	                        if (tds[elementPos - 8].style.color != this.style.color)
	                            setcolor(tds[elementPos - 8]);
	                    if (Math.round(elementPos / 8 + 0.5) != 8)
	                        if (tds[elementPos + 8].style.color != this.style.color)
	                            setcolor(tds[elementPos + 8]);
	                    if (elementPos % 8 != 7)
	                        if (tds[elementPos + 1].style.color != this.style.color)
	                            setcolor(tds[elementPos + 1]);
	                    if (elementPos % 8 != 0)
	                        if (tds[elementPos - 1].style.color != this.style.color)
	                            setcolor(tds[elementPos - 1]);


	                    if (elementPos % 8 != 7 && Math.round(elementPos / 8 + 0.5) != 8)
	                        if (tds[elementPos + 9].style.color != this.style.color)
	                            setcolor(tds[elementPos + 9]);
	                    if (elementPos % 8 != 7 && Math.round(elementPos / 8 + 0.5) != 1)
	                        if (tds[elementPos - 7].style.color != this.style.color)
	                            setcolor(tds[elementPos - 7]);
	                    if (elementPos % 8 != 0 && Math.round(elementPos / 8 + 0.5) != 1)
	                        if (tds[elementPos - 9].style.color != this.style.color)
	                            setcolor(tds[elementPos - 9]);
	                    if (elementPos % 8 != 0 && Math.round(elementPos / 8 + 0.5) != 8)
	                        if (tds[elementPos + 7].style.color != this.style.color)
	                            setcolor(tds[elementPos + 7]);
	                }
	                break;
	        }
	    } else {
	        if (this.style.background == "red" || this.style.background == "pink") {

	            var mohre = selected.innerHTML;
	            var color = selected.style.color;
	            selected.innerHTML = "";
	            if (this.innerHTML != "") {
	                var score;
	                switch (this.innerHTML) {
	                    case pawn:
	                        score = 1;
	                        break;
	                    case rook:
	                        score = 5;
	                        break;
	                    case bishop:
	                        score = 3;
	                        break;
	                    case knight:
	                        score = 3;
	                        break;
	                    case queen:
	                        score = 9;
	                        break;
	                }

	                if (this.style.color == "black") {
	                    document.getElementById("white-score").innerHTML = parseInt(document.getElementById("white-score").innerHTML) + score;
	                    document.getElementById("black-chessman-panel").innerHTML = document.getElementById("black-chessman-panel").innerHTML + "\n" + this.innerHTML;
	                } else {
	                    document.getElementById("black-score").innerHTML = parseInt(document.getElementById("black-score").innerHTML) + score;
	                    document.getElementById("white-chessman-panel").innerHTML = document.getElementById("white-chessman-panel").innerHTML + "\n" + this.innerHTML;
	                }
	            }

	            this.innerHTML = mohre;
	            this.style.color = color;
	            if (turn == "white") {
	                turn = "black";
	            } else {
	                turn = "white";

	            }
	            document.getElementById("turn").innerHTML = turn;
	            document.getElementById("turn").className = turn;

	            //window.alert(getOffset(this).left);
	            findCheck()
	            if (check == this.style.color) {
	                selected.innerHTML = this.innerHTML;
	                selected.style.color = this.style.color;
	                this.innerHTML = "";
	                this.style.color = null;
	            } else
	                selected = null;

	            refreshTable();


	        }
	    }
		
		
	}



	function getIndex(item) {
	    for (var t = 0; t < tds.length; t++)
	        if (tds[t] == item)
	            return t;
	    return 0;

	}


	function refreshTable() {
	    for (var i = 0; i < 8; i++)
	        for (var j = 0; j < 8; j++) {
	            var index = 8 * j + i;
	            if (i % 2 == 0)
	                if (j % 2 == 0)
	                    tds[index].style.background = white;
	                else
	                    tds[index].style.background = black;
	            else
	            if (j % 2 != 0)
	                tds[index].style.background = white;
	            else
	                tds[index].style.background = black;
	            if (tds[index].innerHTML == "")
	                tds[index].style.color = "";
	        }
	}
	var check;

	function findCheck() {
		refreshTable();
	    check = null;
	    var tds = document.getElementsByTagName("td");
	    var temp = turn;
	    for (var i = 0; i < 64; i++) {
	        if (tds[i].innerHTML != "" && tds[i].innerHTML != king) {
	            turn = tds[i].style.color;
	            tds[i].onmousedown();
	            selected = null;
	            for (var j = 0; j < 64; j++)
	                if ((tds[j].style.background == "red" || tds[j].style.background == "pink")  && tds[j].innerHTML == king) {
	                    window.alert("check");
	                    check = tds[j].style.color;
	                    //return tds[j].style.color;
	                }
	                //	itemSelected();
	        }
	        turn = temp;
	        //return null;
	    }
	}

	function getOffset(el) {
	    var _x = 0;
	    var _y = 0;
	    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
	        _x += el.offsetLeft - el.scrollLeft;
	        _y += el.offsetTop - el.scrollTop;
	        el = el.offsetParent;
	    }

	    return {
	        top: _y,
	        left: _x
	    };
	}
	
	
	function setcolor(item){
		
				var index =  getIndex(item);
				var i = Math.round(index / 8 + 0.5);
				var j = index % 8;
	           if (i % 2 == 0)
	                if (j % 2 == 0)
	                    tds[index].style.background = "pink";
	                else
	                    tds[index].style.background = "red";
	            else
					if (j % 2 != 0)
						tds[index].style.background = "pink";
					else
						tds[index].style.background = "red";
	}
	
	
function checkAgain(){

}