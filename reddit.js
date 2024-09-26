function do_reddit_up(){

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
	var shredditPost = document.querySelector('shreddit-post');
	if (shredditPost && shredditPost.shadowRoot) {
		var div = shredditPost.shadowRoot.querySelector('button[upvote][aria-pressed="false"]');
		if(!div) { 
			console.log("upvote button not found !");
			return; 
		}

		div.click();
	}
	
}

function do_reddit_mem(){

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
	var headerButtons = document.querySelector('shreddit-subreddit-header-buttons');
	if (headerButtons && headerButtons.shadowRoot) {
		var joinButton = headerButtons.shadowRoot.querySelector('shreddit-join-button');
		if (joinButton && joinButton.shadowRoot) {
			var div = joinButton.shadowRoot.querySelector('button');
			if(!div) { 
				console.log("join button not found !");
				return; 
			}

			div.click();
		}
	}
}

var reddit_done = false;

function do_reddit(){

	// wait for 5 seconds
	if(tick_count < 2) { return; }

	if(tick_count > _TIMEOUT_IN_SECS) {
		// timeout
		window.close();
	}

	if(reddit_done) { return; }
	reddit_done = true;

	console.log("Reddit done");
	console.log("config.actionType = "+config.actionType);

	if (config.actionType === _ACTION_TYPE_REDDIT_MEM) {

		console.log("do_reddit_mem");
		do_reddit_mem();
		return;
	}

	if (config.actionType === _ACTION_TYPE_REDDIT_UP) {
		console.log("do_reddit_up");
		do_reddit_up();
		return;
	}
}