var stopwoorden = ["‘t", "a", "aan", "aangaande", "aangezien", "achter", "achterna", "aen", "af", "afd", "afgelopen", "agter", "al", "aldaar", "aldus", "alhoewel", "alias", "all’", "alle", "allebei", "alleen", "alleenlyk", "allen", "alles", "als", "alsnog", "altijd", "altoos", "altyd", "ander", "andere", "anderen", "anders", "anderszins", "anm", "b", "behalve", "behoudens", "beide", "beiden", "ben", "beneden", "bent", "bepaald", "beter", "betere", "betreffende", "bij", "bijna", "bijvoorbeeld", "binnen", "binnenin", "bizonder", "bizondere", "bl", "blz", "boven", "bovenal", "bovendien", "bovengenoemd", "bovenstaand", "bovenvermeld", "buiten", "by", "daar", "daarheen", "daarin", "daarna", "daarnet", "daarom", "daarop", "daarvanlangs", "daer", "dan", "dat", "de", "deeze", "den", "der", "ders", "derzelver", "des", "deszelfs", "deszelvs", "deze", "dezelfde", "dezelve", "dezelven", "dezen", "dezer", "dezulke", "die", "dien", "dikwijls", "dikwyls", "dit", "dl", "doch", "doen", "doet", "dog", "door", "doorgaand", "doorgaans", "dr", "dra", "ds", "dus", "echter", "ed", "een", "een’", "eene", "eenen", "eener", "eenig", "eenige", "eens", "eer", "eerdat", "eerder", "eerlang", "eerst", "eerste", "eersten", "effe", "egter", "eigen", "eigene", "elk", "elkanderen", "elkanderens", "elke", "en", "enig", "enige", "enigerlei", "enigszins", "enkel", "enkele", "enz", "er", "erdoor", "et", "etc", "even", "eveneens", "evenwel", "ff", "gauw", "ge", "gebragt", "gedurende", "geen", "geene", "geenen", "gegeven", "gehad", "geheel", "geheele", "gekund", "geleden", "gelijk", "gelyk", "gemoeten", "gemogen", "geven", "geweest", "gewoon", "gewoonweg", "geworden", "gezegt", "gij", "gt", "gy", "haar", "had", "hadden", "hadt", "haer", "haere", "haeren", "haerer", "hans", "hare", "heb", "hebben", "hebt", "heeft", "hele", "hem", "hen", "het", "hier", "hierbeneden", "hierboven", "hierin", "hij", "hoe", "hoewel", "hun", "hunne", "hunner", "hy", "ibid", "ieder", "iemand", "iet", "iets", "ii", "ik", "ikke", "ikzelf", "in", "indien", "inmiddels", "inz", "inzake", "is", "ja", "je", "jezelf", "jij", "jijzelf", "jou", "jouw", "jouwe", "juist", "jullie", "kan", "klaar", "kon", "konden", "krachtens", "kunnen", "kunt", "laetste", "lang", "later", "liet", "liever", "like", "m", "maar", "maeken", "maer", "mag", "martin", "me", "mede", "meer", "meesten", "men", "menigwerf", "met", "mezelf", "mij", "mijn", "mijnent", "mijner", "mijzelf", "min", "minder", "misschien", "mocht", "mochten", "moest", "moesten", "moet", "moeten", "mogelijk", "mogelyk", "mogen", "my", "myn", "myne", "mynen", "myner", "myzelf", "na", "naar", "nabij", "nadat", "naer", "net", "niet", "niets", "nimmer", "nit", "no", "noch", "nog", "nogal", "nooit", "nr", "nu", "o", "of", "ofschoon", "om", "omdat", "omhoog", "omlaag", "omstreeks", "omtrent", "omver", "onder", "ondertussen", "ongeveer", "ons", "onszelf", "onze", "onzen", "onzer", "ooit", "ook", "oorspr", "op", "opdat ", "opnieuw", "opzij", "opzy", "over", "overeind", "overigens", "p", "pas", "pp", "precies", "pres", "prof", "publ", "reeds", "rond", "rondom", "rug", "s", "sedert", "sinds", "sindsdien", "sl", "slechts", "sommige", "spoedig", "st", "steeds", "sy", "t", "tamelijk", "tamelyk", "te", "tegen", "tegens", "ten", "tenzij", "ter", "terwijl", "terwyl", "thans", "tijdens", "toch", "toe", "toen", "toenmaals", "toenmalig", "tot", "totdat", "tusschen", "tussen", "tydens", "u", "uit", "uitg", "uitgezonderd", "uw", "uwe", "uwen", "uwer", "vaak", "vaakwat", "vakgr", "van", "vanaf", "vandaan", "vanuit", "vanwege", "veel", "veeleer", "veelen", "verder", "verre", "vert", "vervolgens", "vgl", "vol", "volgens", "voor", "vooraf", "vooral", "vooralsnog", "voorbij", "voorby", "voordat", "voordezen", "voordien", "voorheen", "voorop", "voort", "voortgez", "voorts", "voortz", "vooruit", "vrij", "vroeg", "vry", "waar", "waarom", "wanneer", "want", "waren", "was", "wat", "we", "weer", "weg", "wege", "wegens", "weinig", "weinige", "wel", "weldra", "welk", "welke", "welken", "welker", "werd", "werden", "werdt", "wezen", "wie", "wiens", "wier", "wierd", "wierden", "wij", "wijzelf", "wil", "wilde", "worden", "wordt", "wy", "wyze", "wyzelf", "zal", "ze", "zeer", "zei", "zeker", "zekere", "zelf", "zelfde", "zelfs", "zelve", "zelven", "zelvs", "zich", "zichzelf", "zichzelve", "zichzelven", "zie", "zig", "zij", "zijn", "zijnde", "zijne", "zijner", "zo", "zo’n", "zoals", "zodra", "zommige", "zommigen", "zonder", "zoo", "zou", "zoude", "zouden", "zoveel", "zowat", "zulk", "zulke", "zulks", "zullen", "zult", "zy", "zyn", "zynde", "zyne", "zynen", "zyner", "zyns", "per", "via", "eind", "iedere", "zodat", "waarbij", "enof"];

function GetKeywords(){
	var keywords = {};

	ptrn("",function(f){return f;}).map(function(f){
		var type = f.type();
		var ref = f;
		if(type==="program" || type==="task" || type==="effort" || type==="mission" || type==="kpi" || type==="means" || type==="description" || type==="endproduct"){
			if(ref.type() === "mission"){
				ref = ref("program");
			}
			if(ref.type() === "kpi" || ref.type() === "means" ){
				ref = ref("task");
			}
			if(ref.type() === "description" || ref.type() === "endproduct" ){
				ref = ref("effort");
			}

			if(typeof f.value() === "string"){
				var words = f.value()
					.replace(/[0123456789,.\"'<>/()+\-*%:;!~_]/g, '')
					.replace(/\r?\n|\r/g, '')
					.toLowerCase().split(" ");
				words.map(function(w){
					if(w.length > 1){
						if(!keywords[w]){
							keywords[w] = [ref];
						} else {
							if(!keywords[w].find(function(o){
								return o.id()===ref.id();
							})){
								keywords[w].push(ref);
							}

						}
					}
				});
			}
		}
	});
var alphabet = [{letter: "a", words: []},{letter: "b", words: []},{letter: "c", words: []},{letter: "d", words: []},{letter: "e", words: []},{letter: "f", words: []},{letter: "g", words: []},{letter: "h", words: []},{letter: "i", words: []},{letter: "j", words: []},{letter: "k", words: []},{letter: "l", words: []},{letter: "m", words: []},{letter: "n", words: []},{letter: "o", words: []},{letter: "p", words: []},{letter: "q", words: []},{letter: "r", words: []},{letter: "s", words: []},{letter: "t", words: []},{letter: "u", words: []},{letter: "v", words: []},{letter: "w", words: []},{letter: "x", words: []},{letter: "y", words: []},{letter: "z", words: []}];

	for(var i in keywords){
		if(keywords[i].length > 1 && stopwoorden.indexOf(i) === -1){
			var s = alphabet.find(function(l){
				return l.letter === i.charAt(0);
			});

			s.words.push({
				word: i,
				refs: keywords[i]
			});

			s.words = s.words.sort(function(a,b){
				if(a.word < b.word) return -1;
    			if(a.word > b.word) return 1;
    			return 0;
			});
		}
	}

	return alphabet;
}
