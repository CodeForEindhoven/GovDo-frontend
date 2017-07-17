Models.Changes = (function(){
	var content = [];

	function loadContent(){
		model.get("changes", {}, function(data){
			content = data.filter(function(change){
				return (change.Tasks.length>0); //filter removed changes TODO: move to backend
			}).map(function(change){
				change.new = false;
				if(change.updatedAt == change.createdAt){
					change.new = true;
				}

				change.date = timeSince(new Date(change.updatedAt));

				change.task = change.Tasks[0].name;
				change.program = change.Tasks[0].Programs[0].name;

				return change;
			});
		});
	}

	function getContent(){
		return content;
	}

	function timeSince(date) {

		var seconds = Math.floor((new Date() - date) / 1000);

		var interval = Math.floor(seconds / 31536000);
		if (interval > 1) {
			return interval + " jaar";
		}

		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " maanden";
		}

		interval = Math.floor(seconds / 604800);
		if (interval > 1) {
			return interval + " weken";
		}

		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " dagen";
		}

		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " uur";
		}

		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minuten";
		}

		return Math.floor(seconds) + " seconden";
	}

	return {
		loadContent: loadContent,
		getContent: getContent,
	};
})();
