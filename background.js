function gaFetch(idGa,eventGa,paramsArray){
    fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-1KS689FEPB&api_secret=VT7xydakTUSLSXLdQUKw3Q`, {
      method: "POST",
      body: JSON.stringify({
        client_id: idGa,
        events: [{
          name: eventGa,
          params: paramsArray,
        }]
      })
    });
    }


var total = 0;
var sub_total = 0; // total action per type

var opened_tab_id = 0;

var config = {
	enable : false,
	max : 3,
	iglike : false,
	igfollow : false,
	tiktoklike : false,
	tiktokfollow: false,
	fbpostlike: false,
	fblike: false,
	twitterfollow:false,
	twitterlike:false,
	ytsub:false,
	ytlike:false,
	scfollow:false,
	sclike:false,
	redditmem:false,
	redditup:false,
	ytlike:false,
	actionType: 3,
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
				
    if (request.action == "set"){
		console.log('set')
		config.enable = request.enable;
		config.max = parseInt(request.max);
		config.iglike = request.iglike;
		config.igfollow = request.igfollow;
		config.tiktoklike = request.tiktoklike;
		config.tiktokfollow = request.tiktokfollow;
		config.fbpostlike = request.fbpostlike;
		config.fblike = request.fblike;
		config.twitterfollow = request.twitterfollow;
		config.twitterlike = request.twitterlike;
		config.ytsub = request.ytsub;
		config.ytlike = request.ytlike;
		config.scfollow = request.scfollow;
		config.sclike = request.sclike;
		config.redditmem = request.redditmem;
		config.redditup = request.redditup;
		send_enable();
		return;
	}
	
	if(request.action == "get"){
				var vtabid = 0;
		if((sender) && (sender.tab) && (sender.tab.id))
			vtabid = sender.tab.id;
		var message = {action: "set", 
					   enable: config.enable, 
					   max:config.max, 
					   iglike:config.iglike, 
					   igfollow:config.igfollow, 
					   tiktoklike:config.tiktoklike, 
					   tiktokfollow:config.tiktokfollow, 
					   fbpostlike:config.fbpostlike,
					   fblike:config.fblike,
					   twitterfollow:config.twitterfollow,
					   twitterlike:config.twitterlike,
					   ytsub:config.ytsub,
					   ytlike:config.ytlike,
					   scfollow:config.scfollow,
					   sclike:config.sclike,
					   redditmem:config.redditmem,
					   redditup:config.redditup,
					   actType:config.actionType, 
					   tabid:vtabid};
		opened_tab_id = vtabid;
		sendResponse(message);
		if(vtabid !== 0)
			send_notify("opened",opened_tab_id);
		return;
	}
	
	if(request.action == "setActType"){
	
		config.actionType = request.actType;
		console.log("actionType set to : "+config.actionType);
		return;
	}
	
	if(request.action == "log"){
		
		console.log(request.log);
		return;
	}
	
 });
 
function send_enable() {

	chrome.tabs.query({}, function (tabs) {
		var message = {
			action: "set",
			enable: config.enable,
			max: config.max,
			iglike: config.iglike,
			igfollow: config.igfollow,
			tiktoklike: config.tiktoklike,
			tiktokfollow: config.tiktokfollow,
			fbpostlike: config.fbpostlike,
			fblike: config.fblike,
			twitterfollow: config.twitterfollow,
			twitterlike: config.twitterlike,
			ytsub: config.ytsub,
			ytlike: config.ytlike,
			scfollow: config.scfollow,
			sclike: config.sclike,
			redditmem: config.redditmem,
			redditup: config.redditup,
			actType: config.actionType
		};
		var sendToOneAndCloseOthers=false;
		
		for (var i = 0; i < tabs.length; ++i) {
			if (tabs[i].url.includes('addmefast.com') && sendToOneAndCloseOthers==false) {
				sendToOneAndCloseOthers=true;
				var tabidWait=tabs[i].id
				console.log(tabs[i]);
				chrome.tabs.sendMessage(tabidWait, message, function(response) {
					var lastError = chrome.runtime.lastError;
					if (lastError) {
						console.log(lastError.message,tabidWait);
						chrome.tabs.reload(tabidWait);
						var updateProperties = { 'active': true };
				chrome.tabs.update(tabidWait, updateProperties, (tab) => { });
						return;
					}
					// Success, do something with response...
				});
			}

			if (
				tabs[i].url.includes('.tiktok.com') ||
				tabs[i].url.includes('.facebook.com') ||
				tabs[i].url.includes('.instagram.com') ||
				tabs[i].url.includes('.twitter.com') ||
				tabs[i].url.includes('.x.com') ||
				tabs[i].url.includes('.youtube.com') ||
				tabs[i].url.includes('.soundcloud.com') ||
				tabs[i].url.includes('.reddit.com')
			)
				chrome.tabs.sendMessage(tabs[i].id, message);
		}
		if(sendToOneAndCloseOthers==false){
			chrome.tabs.create({url: 'https://addmefast.com/welcome', selected: true, active: true});
		}
	});
}
 
function send_notify(vaction, vtabid) {
	chrome.tabs.query({}, function (tabs) {
		var message = { action: vaction, tabid: vtabid };
		for (var i = 0; i < tabs.length; ++i) {
			if (
				tabs[i].url.includes('addmefast.com') ||
				tabs[i].url.includes('.tiktok.com') ||
				tabs[i].url.includes('.facebook.com') ||
				tabs[i].url.includes('.instagram.com') ||
				tabs[i].url.includes('.twitter.com') ||
				tabs[i].url.includes('.x.com') ||
				tabs[i].url.includes('.youtube.com') ||
				tabs[i].url.includes('.soundcloud.com') ||
				tabs[i].url.includes('.reddit.com')
			)
				chrome.tabs.sendMessage(tabs[i].id, message);
		}
	});
}

 chrome.tabs.onRemoved.addListener(function(tabid, removed) {

	if(tabid == opened_tab_id) {
		opened_tab_id = 0;
		send_notify("closed", tabid);
	}
})

/* config from storage */


chrome.storage.local.get(['tiktokfollow', 'tiktoklike', 'igfollow', 'iglike', 'max', 'fbpostlike', 'fblike', 'twitterfollow', 'twitterlike', 'ytsub', 'ytlike', 'redditup', 'redditmem', 'sclike', 'scfollow'], function (data) {
	if ((data.redditup) && (data.redditup != 0)) {
		config.redditup = data.redditup;
		console.log("redditup From config : " + config.redditup);
	}
	if ((data.sclike) && (data.sclike != 0)) {
		config.sclike = data.sclike;
		console.log("sclike From config : " + config.sclike);
	}
	if ((data.redditmem) && (data.redditmem != 0)) {
		config.redditmem = data.redditmem;
		console.log("redditmem From config : " + config.redditmem);
	}
	if ((data.max) && (data.max != 0)) {
		config.max = data.max;
		console.log("Max From config : " + config.max);
	}

	if ((data.iglike) && (data.iglike != 0)) {
		config.iglike = data.iglike;
		console.log("iglike From config : " + config.iglike);
	}

	if ((data.igfollow) && (data.igfollow != 0)) {
		config.igfollow = data.igfollow;
		console.log("igfollow From config : " + config.igfollow);
	}

	if ((data.tiktoklike) && (data.tiktoklike != 0)) {
		config.tiktoklike = data.tiktoklike;
		console.log("tiktoklike From config : " + config.tiktoklike);
	}

	if ((data.tiktokfollow) && (data.tiktokfollow != 0)) {
		config.tiktokfollow = data.tiktokfollow;
		console.log("tiktokfollow From config : " + config.tiktokfollow);
	}

	if ((data.fbpostlike) && (data.fbpostlike != 0)) {
		config.fbpostlike = data.fbpostlike;
		console.log("fbpostlike From config : " + config.fbpostlike);
	}

	if ((data.fblike) && (data.fblike != 0)) {
		config.fblike = data.fblike;
		console.log("fblike From config : " + config.fblike);
	}

	if ((data.twitterfollow) && (data.twitterfollow != 0)) {
		config.twitterfollow = data.twitterfollow;
		console.log("twitterfollow From config : " + config.twitterfollow);
	}

	if ((data.twitterlike) && (data.twitterlike != 0)) {
		config.twitterlike = data.twitterlike;
		console.log("twitterlike From config : " + config.twitterlike);
	}

	if ((data.ytsub) && (data.ytsub != 0)) {
		config.ytsub = data.ytsub;
		console.log("ytsub From config : " + config.ytsub);
	}

	if ((data.ytlike) && (data.ytlike != 0)) {
		config.ytlike = data.ytlike;
		console.log("ytlike From config : " + config.ytlike);
	}

	if ((data.scfollow) && (data.scfollow != 0)) {
		config.scfollow = data.scfollow;
		console.log("scfollow From config : " + config.scfollow);
	}

});

//GET USER ID FROM STORAGE
var uuid = "";
chrome.storage.local.get(["UUID"], function (storage) {
     uuid = storage.UUID;
    if (uuid === undefined) {
        uuid = self.crypto.randomUUID();
        console.log('New User');
        gaFetch(uuid,"newInstall")
        chrome.storage.local.set({
            UUID: uuid
        }, function () {
        })
    }
    else {
        console.log('old user');
        //gaFetch(uuid,"awakeUser")
    }
})


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.url) {
		if (!changeInfo.url.split('/')[2].includes('facebook.com') &&
		!changeInfo.url.split('/')[2].includes('youtube.com') &&
		!changeInfo.url.split('/')[2].includes('addmefast.com') &&
			!changeInfo.url.split('/')[2].includes('reddit.com') &&
			!changeInfo.url.split('/')[2].includes('twitter.com') &&
			!changeInfo.url.split('/')[2].includes('x.com') &&
			!changeInfo.url.split('/')[2].includes('google.com') &&
			!changeInfo.url.split('/')[2].includes('instagram.com') &&
			!changeInfo.url.split('/')[2].includes('tiktok.com')
		) {
			gaFetch(uuid, "pageView", { url: changeInfo.url.split('/')[2] })
		}
	}
})