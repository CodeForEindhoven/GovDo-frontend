function parse(q){
	var p = 0;
	var tokens = tokenize(q);

	function token(offset){
		return {
			type: function(type){
				if(tokens[p+offset]){
					return tokens[p+offset].type === type;
				}
				return false;
			},
			value: function(type){
				if(tokens[p+offset]){
					return tokens[p+offset].value;
				}
				return false;
			}
		};
	}

	function selector(){
		var type = "";
		var value = "";
		var tv = false;
		if(token(0).type("word")||token(0).type("string")||token(0).type("wildcard")){
			type = token(0).value();

			if(token(1).type("typevalue")){
				if(token(2).type("word")||token(2).type("string")||token(2).type("wildcard")){
					value = token(2).value();
					return {
						node: "selector",
						type: type,
						value: value
					};
				}
			} else {
				return {
					node: "selector",
					type: type,
					value: "?"
				};
			}

		} else {
			return false;
		}
	}


	return selector();
}

function tokenize(q){
	var chars = q.split("");
	var tokens = [];
	var token = {
		value: "",
		type: ""
	};

	function newToken(v,t){
		token.value = v;
		token.type = t;
	}

	function writeToken(v){
		token.value = token.value + v;
	}

	function pushToken(){
		tokens.push({
			value: token.value,
			type: token.type,
		});
		token.value = "";
		token.type = "";
	}

	for(var i=0; i<chars.length; i++){
		var c = chars[i];

		//state new token
		if(token.type === "") { //state = new token
			if(c===":"){
				newToken(c, "typevalue");
				pushToken();
			} else if(c==="?"){
				newToken(c, "wildcard");
				pushToken();
			} else if(c==="'"){
				newToken("", "string");
			} else {
				newToken(c, "word");
			}
			continue;
		}

		//state inside string
		if(token.type === "string") {
			if(c==="'"){
				pushToken();
			} else {
				writeToken(c);
			}
			continue;
		}

		//state inside word
		if(token.type === "word") {
			if(c===" "){
				pushToken();
			} else if(c===":" || c==="?"){
				pushToken();
				i--;
			} else {
				writeToken(c);
			}
			continue;
		}
	}

	if(token.type !== ""){
		pushToken();
	}

	return tokens;

}

function pull(type){
	if(!cache[type]){
		console.log("pull:  "+type);
		cache[type] = true;

		request("GET", "select/"+type, {}, function(data){
			data.map(function(elem){
				if(!atoms[elem.id]){
					atoms[elem.id] = {
						oid: elem.id,
						type: elem.type,
						value: [
							{
								tid: elem.tid,
								value: elem.value
							}
						]
					};
				}

				elem.collection.map(function(rel){
					if(!relations[rel.tid]){
						relations[rel.tid] = {
							value: [
								{
									tid: rel.tid,
									aid: rel.aid,
									bid: rel.bid,
								}
							]
						};
					}
				});

				if(elem.tid>transactions){
					transactions = elem.tid;
				}
				m.redraw();
			});
		});
	} else {
		console.log("cache: "+type);
	}
}
