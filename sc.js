function do_sc_like(){

	state = _STATE_WAIT_TO_CLOSE;
	wait_time = 10 - Math.floor(Math.random() * 5);
	chrome.storage.local.get('speedTempo', function (result) {
		if (result.speedTempo) {
			if (result.speedTempo == 'slow') {
				wait_time = 15 - Math.floor(Math.random() * 10);
			}
			if (result.speedTempo == 'normal') {
				wait_time = 10 - Math.floor(Math.random() * 5);
			}
			if (result.speedTempo == 'fast') {
				wait_time = 3 - Math.floor(Math.random() * 3);
			}
		}
	})
	var div = document.querySelector('button[title="Like"],button.sc-button-like.sc-button-secondary.sc-button.sc-button-medium.sc-button-responsive');
	if(!div) { 
		console.log("like button not found !");
		return; 
	}
	
	div.click();
	
}

function do_sc_follow(){

	state = _STATE_WAIT_TO_CLOSE;
	wait_time = 10 - Math.floor(Math.random() * 5);
	chrome.storage.local.get('speedTempo', function (result) {
		if (result.speedTempo) {
			if (result.speedTempo == 'slow') {
				wait_time = 15 - Math.floor(Math.random() * 10);
			}
			if (result.speedTempo == 'normal') {
				wait_time = 10 - Math.floor(Math.random() * 5);
			}
			if (result.speedTempo == 'fast') {
				wait_time = 3 - Math.floor(Math.random() * 3);
			}
		}
	})
	var div = document.querySelector('button.sc-button-follow');
	if(!div) { 
		console.log("follow button not found !");
		return; 
	}
	
	div.click();
}

var soundcloud_done = false;

function do_soundcloud(){
	
	// wait for 5 seconds
	if(tick_count < 2) { return; }
	
	if(tick_count > _TIMEOUT_IN_SECS) {
		// timeout
		window.close();
	}

	if(soundcloud_done) { return; }
	soundcloud_done = true;
	
	console.log("soundcloud_done");
	console.log("config.actionType = "+config.actionType);
	
	if (config.actionType === _ACTION_TYPE_SC_FOLLOW) {
		
		console.log("do_sc_follow");
		do_sc_follow();
		return;
	}
	
	if (config.actionType === _ACTION_TYPE_SC_LIKE) {
		console.log("do_sc_like");
		do_sc_like();
		return;
	}
}