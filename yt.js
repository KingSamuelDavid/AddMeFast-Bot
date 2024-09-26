function do_yt_like(){

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
	btn = document.querySelector('button[aria-label^="like"');
	if(btn){
		btn.click();	
	} else {
		console.log("like button not found !");
	}
}

function do_yt_sub() {

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
	if (document.querySelector('button[aria-label^="Subscribe to"]')) {
		buttons = document.querySelector('button[aria-label^="Subscribe to"]')
		buttons.click()
	} else {
		console.log("No Subscribe button found :()");
		return;
	}
}

var youtube_done = false;

function do_youtube(){
	
	// wait for 5 seconds
	if(tick_count < 2) { return; }
	
	if(tick_count > _TIMEOUT_IN_SECS) {
		// timeout
		window.close();
	}

	if(youtube_done) { return; }
	youtube_done = true;
	
	console.log("youtube_done");
	console.log("config.actionType = "+config.actionType);
	
	if (config.actionType === _ACTION_TYPE_YT_SUB) {
		
		console.log("do_yt_sub");
		do_yt_sub();
		return;
	}
	
	if (config.actionType === _ACTION_TYPE_YT_LIKE) {
		console.log("do_yt_like");
		do_yt_like();
		return;
	}
}