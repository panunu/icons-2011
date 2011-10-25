/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                 I want to WebGL                     *
 *   A WebGL demo engine by Segrel/Accesion^Primitive  *
 *   Licenced under beerware, also greetings are nice  *
 *                                                     *
 *   Thanks to iq for ShaderToy!                       *
 *                                                     *
 *   Uses some code from Mozilla Developer Network     *
 *   Partly Google's WebGL init, see webgl-utils.js    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var audio;
var audioDuration;
var audioLoaded=0;
var audioPlaying=0;

function audioDurated() {
	//we have the final length of audio!
	audio = document.getElementById('audio');
	audioDuration = audio.duration;

	//in case of audio duration only gotten after full load
	if (audio.buffered.end(audio.buffered.length-1) == audioDuration) {
			audioLoaded=1;
			isLoaded();
	}
}

function audioLoading() {
	audio = document.getElementById('audio');
	if (typeof audioDuration !== "undefined") {
		if (audio.buffered.end(audio.buffered.length-1) == audioDuration)
		{
			audioLoaded=1;
			isLoaded();
		} else {
			loadMessage("Loading audio "+(audio.buffered.end(audio.buffered.length-1)/audioDuration)*100+"...")
		}
	} else {
		//TODO: make a "precalc" audio length for (approximate) load status
		loadMessage("Loading audio...");
	}
}

function audioInit() {
	//the genesis!
	audio = document.getElementById('audio');
	audio.controls = false;
	audio.load();
	loadMessage("Loading started...");
}

function audioPlay() {
  //final setup of audio (also: play)
  audio.addEventListener('ended', function() {demoDone++;}, false);
  audio.removeEventListener('onprogress', audioLoading, false);
  audio.removeEventListener('durationchange', audioDurated, false);
  audio.play();
	audioPlaying=1;
	
	demoMain();
}

function audioPause() {
	if (audioPlaying==1) {
		audio.pause();
		audioPlaying=0;
	} else {
		audio.play();
		audioPlaying=1;
	}
}
