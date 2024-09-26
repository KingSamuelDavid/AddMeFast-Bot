function do_instagram_like(){

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
	//var sec = document.querySelector('section.Slqrh');
	//if(!sec) { return; }
	
	var btns=document.querySelector('[d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"]').parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
	if (btns.childNodes.length>1) {
		btns.childNodes[0].childNodes[0].click();
		console.log("Liked !");
	}
		else { }

	

	/*for (var i = 0; i < btns.length; i++) {
		if (btns[i].querySelector('[aria-label="Like"]')) {
			var svgs = btns[i].querySelector('[aria-label="Like"]').parentElement;
		} else if (btns.length > 0) {
			svgs=btns[i].parentElement;

		}
		if (svgs) {
			svgs.click();
			break;
		}
	}*/
}

function do_instagram_follow(){

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
	var btns = document.querySelectorAll('[type="button"]');

	if(btns.length < 1) { return false; }

	for(var i=0; i<btns.length; i++){
		if(btns[i].textContent == "Follow") {

			btns[i].click();
			console.log("Followed !");
			break;
		}
	}	
}

var instagram_done = false;

function do_instagram(){
	
	// wait for 5 seconds
	if(tick_count < 2) { return; }
	
	if(tick_count > _TIMEOUT_IN_SECS) {
		// timeout
		window.close();
	}

	if(instagram_done) { return; }
	instagram_done = true;
	
	console.log("do_instagram");
	console.log("config.actionType = "+config.actionType);
	
	if (config.actionType === _ACTION_TYPE_INSTAGRAM_LIKE) {
		
		console.log("do_instagram_like");
		do_instagram_like();
		return;
	}
	
	if (config.actionType === _ACTION_TYPE_INSTAGRAM_FOLLOW) {
		console.log("do_instagram_follow");
		do_instagram_follow();
		return;
	}
}