// JavaScript Document
function do_twitter_like(){
	console.log("Doing Twitter Like");
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
	var div = document.querySelector('[data-testid="confirmationSheetConfirm"]');

	if((div) && (div.textContent==="Like")){
		div.click();
		return true;
	}
	
	div = document.querySelector('div[aria-label="Like"]');	
	
	if (div){
		div.click();
		return true;
	}
	
	return false;
}

function do_twitter_follow(){
	console.log("Doing Twitter Follow");
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
	var div = document.querySelector('[data-testid="confirmationSheetConfirm"]');
	if(!div){
		div = document.querySelector('div[aria-label^="Follow @"]');
	}
	
	var tc = '';
	if(div){
		tc = div.textContent;
		if (tc.toLowerCase().includes("follow")) {
			div.click();
		} else {
			console.log("invalid confirmation sheet")
		}
		
		return true;
	}
	
	return false;
}

var twitter_done = false;

function do_twitter(){
	
	// wait for 5 seconds
	if(tick_count < 2) { return; }
	
	if(tick_count > _TIMEOUT_IN_SECS) {
		// timeout
		window.close();
	}

	if(twitter_done) { return; }
	
	twitter_done = true;
	console.log("config.actionType = "+config.actionType);
	
	if (config.actionType === _ACTION_TYPE_TWITTER_LIKE) {
		
		do_twitter_like();
		return;
	}
	
	if (config.actionType === _ACTION_TYPE_TWITTER_FOLLOW) {
		do_twitter_follow();
		return;
	}
}