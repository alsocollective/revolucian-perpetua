//Tap JS

document.addEventListener("DOMContentLoaded", function() {

	var close = document.getElementById("xx");
	var bg = document.getElementById("tap");
	var modal = document.getElementById("modal");
	var textOut = document.getElementById("speech");
	var max = 20;
	var manifesto = ["Freeman", "and", "slave", "patrician", "and", "plebeian", "lord", "and", "serf", "guild-master", "and", "journeyman", "in", "a", "word", "oppressor", "and", "oppressed", "stood", "in", "constant", "opposition", "to", "one", "another", "carried", "on", "an", "uninterrupted", "now", "hidden", "now", "open", "fight", "a", "fight", "that", "each", "time", "ended", "either", "in", "a", "revolutionary", "reconstitution", "of", "society", "at", "large", "or", "in", "the", "common", "ruin", "of", "the", "contending", "classes", "In", "the", "earlier", "epochs", "of", "history", "we", "find", "almost", "everywhere", "a", "complicated", "arrangement", "of", "society", "into", "various", "orders", "a", "manifold", "gradation", "of", "social", "rank", "In", "ancient", "Rome", "we", "have", "patricians", "knights", "plebeians", "slaves;", "in", "the", "Middle", "Ages", "feudal", "lords", "vassals", "guild-masters", "journeymen", "apprentices", "serfs", "in", "almost", "all", "of", "these", "classes", "again", "subordinate", "gradations", "The", "modern", "bourgeois", "society", "that", "has", "sprouted", "from", "the", "ruins", "of", "feudal", "society", "has", "not", "done", "away", "with", "class", "antagonisms", "It", "has", "but", "established", "new", "classes", "new", "conditions", "of", "oppression", "new", "forms", "of", "struggle", "in", "place", "of", "the", "old", "ones"];

	// close.onclick = function() {
	// 	modal.className = "close";
	// };

	console.log("Tap JS Init");

	var mvgAvg = null;

	function handleMotionEvent(event) {

		var z = event.accelerationIncludingGravity.z;

		mvgAvg = (z * 0.4) + (mvgAvg * (1 - 0.4));

		if ((Math.abs(mvgAvg - z)) > 1) {
			bg.className = "bgWhite";
			textOut.innerHTML = manifesto[Math.floor((Math.random() * manifesto.length) + 1)];
		} else {
			bg.className = "";
		}
	}
	window.addEventListener("devicemotion", handleMotionEvent, true);
});