
var config = {
	enable : 0,
	max : 0,
	iglike: false,
	igfollow: false,
	tiktoklike: false,
	tiktokfollow: false,
	fbpostlike: false,
	fblike: false,
	twitterfollow: false,
	twitterlike: false,
	ytsub: false,
	ytlike: false,
	scfollow: false,
	sclike: false,
	redditmem: false,
	redditup: false
}

$(document).ready(function(){
	modalStuff();

	document.querySelector('#fast-icon').addEventListener('click', function () {
		chrome.storage.local.set({ speedTempo: "fast" }, function () { })
		switchTempoFocus('fast');
	})
	document.querySelector('#normal-icon').addEventListener('click', function () {
		chrome.storage.local.set({ speedTempo: "normal" }, function () { })
		switchTempoFocus('normal');
	})
	document.querySelector('#slow-icon').addEventListener('click', function () {
		chrome.storage.local.set({ speedTempo: "slow" }, function () { })
		switchTempoFocus('slow');
	})


	$("btn#start").click(function(){
		var txt = $(this).text();
		if (txt==="Start"){

			config.max = $('#maxclick').val();
			config.iglike = $("#iglike").is(":checked");
			config.igfollow = $("#igfollow").is(":checked");
			config.tiktoklike = $("#tiktoklike").is(":checked");
			config.tiktokfollow = $("#tiktokfollow").is(":checked");
			config.fbpostlike = $("#fbpostlike").is(":checked");
			config.fblike = $("#fblike").is(":checked");
			config.twitterfollow = $("#twitterfollow").is(":checked");
			config.twitterlike = $("#twitterlike").is(":checked");
			config.ytsub = $("#ytsub").is(":checked");
			config.ytlike = $("#ytlike").is(":checked");
			config.scfollow = $("#scfollow").is(":checked");
			config.sclike = $("#sclike").is(":checked");
			config.redditmem = $("#redditmem").is(":checked");
			config.redditup = $("#redditup").is(":checked");

			if((!config.iglike) && (!config.igfollow) && (!config.tiktoklike) && (!config.tiktokfollow) && (!config.fblike) && 
			   (!config.fbpostlike) && (!config.twitterfollow) && (!config.twitterlike) && (!config.ytsub) && (!config.ytlike) &&
			  (!config.scfollow) && (!config.sclike) && (!config.redditmem) && (!config.redditup)){
				return;
			}

			config.enable = true;
			$(this).text("Stop");
			$(this).removeClass("btn-success");
			$(this).addClass("btn-danger");
			
			chrome.storage.local.set({enable:true,max:config.max, iglike: config.iglike, igfollow: config.igfollow, tiktoklike:config.tiktoklike,
									tiktokfollow:config.tiktokfollow, fbpostlike:config.fbpostlike,fblike:config.fblike,
									twitterfollow:config.twitterfollow, twitterlike:config.twitterlike,ytsub:config.ytsub,ytlike:config.ytlike,
									scfollow:config.scfollow,sclike:config.sclike,redditmem:config.redditmem,redditup:config.redditup});
			
		} else {
			$(this).text("Start");
			$(this).removeClass("btn-danger");
			$(this).addClass("btn-success");
			config.enable = false;
			chrome.storage.local.set({enable:false});
		}

		set_status();
	});
	
	get_status();
	//setInterval(get_status,1000);
});	

function set_status(){
	
	EnableControls(config.enable ? true : false);
	chrome.runtime.sendMessage({action: "set",
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
			redditup: config.redditup
		});		

}

function get_status(){
	var $b = $("btn#start");
	console.log('get status')
	//chrome.runtime.sendMessage({action: "get"}, function(response){
		chrome.storage.local.get(['enable','tiktokfollow', 'tiktoklike', 'igfollow', 'iglike', 'max', 'fbpostlike', 'fblike', 'twitterfollow', 'twitterlike', 'ytsub', 'ytlike', 'redditup', 'redditmem', 'sclike', 'scfollow'], function (data) {
			console.log(data)
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
			if ((data.enable) && (data.enable != 0)) {
				config.enable = data.enable;
				console.log("enable From config : " + config.enable);			
			}
		
		/*});
		config.enable = response.enable;
		config.max = response.max;
		config.iglike = response.iglike;
		config.igfollow = response.igfollow;
		config.tiktoklike = response.tiktoklike;
		config.tiktokfollow = response.tiktokfollow;
		config.fbpostlike = response.fbpostlike;
		config.fblike = response.fblike;
		config.twitterfollow = response.twitterfollow;
		config.twitterlike = response.twitterlike;
		config.ytsub = response.ytsub;
		config.ytlike = response.ytlike;
		config.scfollow = response.scfollow;
		config.sclike = response.sclike;
		config.redditmem = response.redditmem;
		config.redditup = response.redditup;
		*/
		if (config.enable == false){
			$b.text("Start");
			$b.removeClass("btn-danger");
			$b.addClass("btn-success");
		} else {
			$b.text("Stop");
			$b.removeClass("btn-success");
			$b.addClass("btn-danger");
		}
		if(config.max==0){
			document.getElementById('maxclick').setAttribute('placeholder','How many clicks before moving to next category?')
		}else{
			$('#maxclick').val(config.max);
		}
		if(typeof config.iglike!= 'undefined')
		$('#iglike').prop("checked",config.iglike);

		if(typeof config.igfollow!= 'undefined')
		$('#igfollow').prop("checked",config.igfollow);

		if(typeof config.tiktoklike!= 'undefined')
		$('#tiktoklike').prop("checked",config.tiktoklike);

		if(typeof config.tiktokfollow!= 'undefined')
		$('#tiktokfollow').prop("checked",config.tiktokfollow);

		if(typeof config.fbpostlike!= 'undefined')
		$('#fbpostlike').prop("checked",config.fbpostlike);

		if(typeof config.fblike!= 'undefined')
		$('#fblike').prop("checked",config.fblike);

		if(typeof config.twitterfollow!= 'undefined')
		$('#twitterfollow').prop("checked",config.twitterfollow);

		if(typeof config.twitterlike!= 'undefined')
		$('#twitterlike').prop("checked",config.twitterlike);

		if(typeof config.ytsub!= 'undefined')
		$('#ytsub').prop("checked",config.ytsub);

		if(typeof config.ytlike!= 'undefined')
		$('#ytlike').prop("checked",config.ytlike);

		if(typeof config.scfollow!= 'undefined')
		$('#scfollow').prop("checked",config.scfollow);

		if(typeof config.sclike!= 'undefined')
		$('#sclike').prop("checked",config.sclike);

		if(typeof config.redditmem!= 'undefined')
		$('#redditmem').prop("checked",config.redditmem);

		if(typeof config.redditup!= 'undefined')
		$('#redditup').prop("checked",config.redditup);
		
		EnableControls(config.enable ? true : false);
		
	});
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

	if(request.action === "count"){
		$("btn#count").text(request.value);
		if(request.enable != 1){
		  var $b = $("btn#start");
		  $b.removeClass("btn-danger");
		  $b.addClass("btn-success");
		  $b.text("Start");
		}
		//return;
	}
});

function EnableControls(val){
		$('#maxclick').prop("disabled",val);
		$('#iglike').prop("disabled",val);
		$('#igfollow').prop("disabled",val);
		$('#tiktoklike').prop("disabled",val);
		$('#tiktokfollow').prop("disabled",val);
		$('#fbpostlike').prop("disabled",val);
		$('#fblike').prop("disabled",val);
		$('#twitterfollow').prop("disabled",val);
		$('#twitterlike').prop("disabled",val);
		$('#ytsub').prop("disabled",val);
		$('#ytlike').prop("disabled",val);
		$('#scfollow').prop("disabled",val);
		$('#sclike').prop("disabled",val);
		$('#redditmem').prop("disabled",val);
		$('#redditup').prop("disabled",val);

}

chrome.storage.local.get('speedTempo', function (result) {
	
	if (result.speedTempo) {
		if (result.speedTempo == 'slow') {console.log(result.speedTempo)
			document.querySelector('#slow-icon').style.border="2px solid #1bdbf8";
			document.querySelector('#slow-icon').style.borderRadius="45px"
			document.getElementById('speed-label').innerHTML="Choose Speed: Slow"
		}
		else if (result.speedTempo == 'fast') {
			document.querySelector('#fast-icon').style.border="2px solid #1bdbf8";
			document.querySelector('#fast-icon').style.borderRadius="45px"
			document.getElementById('speed-label').innerHTML="Choose Speed: Fast"
		}
		else{
			document.querySelector('#normal-icon').style.border="2px solid #1bdbf8";
			document.querySelector('#normal-icon').style.borderRadius="45px"
			document.getElementById('speed-label').innerHTML="Choose Speed: Normal"
		}
	}
	else{
		document.getElementById('speed-label').innerHTML="Choose Speed: Normal"
		document.querySelector('#normal-icon').style.border="2px solid #1bdbf8";
		document.querySelector('#normal-icon').style.borderRadius="45px"
	}
})



function switchTempoFocus(selected){
if(selected=="slow"){
	document.getElementById('speed-label').innerHTML="Choose Speed: Slow"
	document.querySelector('#slow-icon').style.border="2px solid #1bdbf8";
	document.querySelector('#slow-icon').style.borderRadius="45px"
	document.querySelector('#normal-icon').style.border="0px solid #1bdbf8";
	document.querySelector('#fast-icon').style.border="0px solid #1bdbf8";
}
if(selected=="normal"){
	document.getElementById('speed-label').innerHTML="Choose Speed: Normal"
	document.querySelector('#normal-icon').style.border="2px solid #1bdbf8";
	document.querySelector('#normal-icon').style.borderRadius="45px"
	document.querySelector('#slow-icon').style.border="0px solid #1bdbf8";
	document.querySelector('#fast-icon').style.border="0px solid #1bdbf8";
}
if(selected=="fast"){
	document.getElementById('speed-label').innerHTML="Choose Speed: Fast"
	document.querySelector('#fast-icon').style.border="2px solid #1bdbf8";
	document.querySelector('#fast-icon').style.borderRadius="45px"
	document.querySelector('#normal-icon').style.border="0px solid #1bdbf8";
	document.querySelector('#slow-icon').style.border="0px solid #1bdbf8";
}

}
addText();
function addText() {
	chrome.storage.local.get("lastAdTimestamp", function (data) {
		var lastAdTimestamp = data.lastAdTimestamp;
		var currentTime = new Date().getTime();
		if (!lastAdTimestamp) {
			chrome.storage.local.set({ "lastAdTimestamp": currentTime });
		}
		else {
			if (currentTime - lastAdTimestamp >= 48 * 60 * 60 * 1000) {
				document.getElementById("askForAd").style.display = "block";
			}
		}
	});
}

function modalStuff(){

	 // Get the modal
	 var modal = document.getElementById("myModal");


	 // Get the <span> element that closes the modal
	 var span = document.getElementsByClassName("close")[0];
	
	
	
	 // When the user clicks on <span> (x), close the modal
	 span.onclick = function() {
	   modal.style.display = "none";
	 }
	
	 // When the user clicks anywhere outside of the modal, close it
	 window.onclick = function(event) {
	   if (event.target == modal) {
		 modal.style.display = "none";
	   }
	 }

	   // Check if 24 hours have passed since last opening the modal
	   chrome.storage.local.get("lastOpenedTimestamp", function(data) {
		var lastOpenedTimestamp = data.lastOpenedTimestamp;
		var currentTime = new Date().getTime();
	
		if (!lastOpenedTimestamp || currentTime - lastOpenedTimestamp >= 24 * 60 * 60 * 1000) {
			//modal.style.display = "block";
		  chrome.storage.local.set({ "lastOpenedTimestamp": currentTime });
		}
	  });
	
}


 // Function to close the modal
 function closeModal() {
   modal.style.display = "none";

 }