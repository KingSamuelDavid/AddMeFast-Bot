function do_fb_like(){

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
	var section =  document.querySelector('div[role="main"]>div');
	if(!section) { console.log("section not found !"); return; }
	
	//if(section.querySelector("div._5u9t")) { console.log("already liked"); return; }
	
	var s = "";
	var div = section.querySelectorAll('[aria-label="Like"]');
	if(div.length==0) {
div = section.querySelectorAll('[aria-label="Follow"]')
console.log('nasao follow');
		}
	
	for(var i=0; i<div.length; i++){

		s = div[i].textContent;
		if(s === "Like" || s=== "Follow"){
			
			// check for class 'div._5u9t' di parent
			var b = false;
			var dv = div[i].parentElement;
			while ((dv) && (dv !== section)) {
			
				if(dv.className.indexOf("_5u9t") !== -1){
					b = true;
					break;
				}
				
				dv = dv.parentElement;
			}
			
			if(!b) { div[i].click(); } else { console.log("already liked!"); }
			return;
		}
	}
}

function do_fb_post_like(){

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
	

	var div = document.querySelector('div[aria-label="Remove Like"]');
	if(div) { return; }
	
	var div = document.querySelector('[data-sigil="touchable ufi-inline-like like-reaction-flyout"],[aria-label="Like"]');
	if(!div) { return; }
	div.click();
}

var facebook_done = false;

function do_facebook(){
	
	// wait for 5 seconds
	if(tick_count < 2) { return; }
	
	if(tick_count > _TIMEOUT_IN_SECS) {
		// timeout
		window.close();
	}

	if(facebook_done) { return; }
	facebook_done = true;
	
	console.log("do_facebook");
	console.log("config.actionType = "+config.actionType);
	
	if (config.actionType === _ACTION_TYPE_FACEBOOK_POST_LIKE) {
		
		console.log("do_fb_post_like");
		do_fb_post_like();
		return;
	}
	
	if (config.actionType === _ACTION_TYPE_FACEBOOK_LIKE) {
		console.log("do_fb_like");
		do_fb_like();
		return;
	}
}