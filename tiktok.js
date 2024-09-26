function do_tiktok_like() {

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

	var div = document.querySelectorAll('div.engagement-icon-v23');
	if ((!div) || (div.length < 1)) {
		div = document.querySelector('span[data-e2e="like-icon"');
	}
	else {
		div = div[0];
	}
	if (div) {
		console.log("Clicked !");
		click(div);
		return true;
	}
	return false;
}

function do_tiktok_follow(){

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
	var btns = document.getElementsByTagName("button");
	if(!btns) { return false; }
	if(btns.length < 1) { return false; }

	//btns[0].click();
	for(var i=0; i<btns.length; i++){
		if(btns[i].textContent == "Follow") {

			//btns[i].click();
			click(btns[i]);
			return true;
		}
	}	
}

var tiktok_done = false;

function do_tiktok(){
	
	// wait for 5 seconds
	if(tick_count < 2) { return; }
	
	if(tick_count > _TIMEOUT_IN_SECS) {
		// timeout
		window.close();
	}

	if(tiktok_done) { return; }
	
	tiktok_done = true;
	console.log("config.actionType = "+config.actionType);
	
	if (config.actionType === _ACTION_TYPE_TIKTOK_LIKE) {
		
		do_tiktok_like();
		return;
	}
	
	if (config.actionType === _ACTION_TYPE_TIKTOK_FOLLOW) {
		do_tiktok_follow();
		return;
	}
}