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

var gl;

var loadDone=0;
var demoDone=0;

var windowWidth;
var windowHeight;
var windowAspect;
var canvasWidth;
var canvasHeight;

function engineStart() {
	//init (and load, duh) audio if needed.
	if (audioLoaded == 0) {audioInit();}

	//init WebGL
	loadMessage("Initing WebGL...")
	var canvas = document.getElementById("webglcanvas");
	glInit(canvas);
	if (loadDone == -1) {return;}

	loadMessage("Loading demo...")
	//init demo-specific stuff
	demoInit();
	if (loadDone == -1) {return;}

	//clear
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.BLEND);

	//test for some stuff
	if (gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS) < 16) {
		document.getElementById("notes").innerHTML = "<br />Your browser doesn't support enough texture units<br />Demo probably won't show as intended."
	}

	if (loadDone == 0)
		loadDone=1;
	isLoaded();
}

function isLoaded() {
	//ready to go?
	if (audioLoaded && loadDone == 1 && texturesDone) {
		prepareIndex();
	} else if (!audioLoaded) {
		loadMessage("Loading audio...");
	}	else if (!texturesDone) {
		loadMessage("Loading textures...");
	} else if (loadDone) {
		loadMessage("Loading demo...")
	} else {
		loadMessage("Something gone wrong...")
	}
}

function prepareIndex() {
	document.getElementById("playbutton").style.display = 'block';
	document.getElementById("status").style.display = 'none';
}

function glInit(canvas) {
  if (!window.WebGLRenderingContext) {
		loadError("Your browser doesn't support WebGL.");
    return null;
  }

	gl = create3DContext(canvas);
	if (!gl) {
		loadError("WebGL init failed, probably a hardware or configuration problem.");
	}
}

function loadMessage(msg) {
	//don't update if load finished or error has occured
	if (loadDone == 0) {
		statusLabel = document.getElementById('status');
		statusLabel.innerHTML = msg;
	}
}

function loadError(msg) {
	statusLabel = document.getElementById('status');
	//on first error, clear loading messages, else add error after previous
	if (loadDone == 0) {
		statusLabel.innerHTML = "ERROR: "+ msg + "<br/>";
	} else {
		statusLabel.innerHTML += msg + "<br />";
	}
	loadDone = -1;
}

function demoStart() {
	var canvas = document.getElementById("webglcanvas");

	//get and set width and height -stuff
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	windowAspect = windowWidth/windowHeight;

	//if we have set fixed AR - make it happen
	if (fixedAspect != 0 && windowAspect != fixedAspect) {
		if (windowAspect < fixedAspect) {
			canvasWidth = windowWidth;
			canvasHeight = (windowWidth / fixedAspect);
			
			canvas.style.paddingTop = (windowHeight - canvasHeight) * 0.5 + "px";
		} else {
			canvasWidth = windowHeight * fixedAspect;
			canvasHeight = windowHeight;
			
			canvas.style.paddingLeft = (windowWidth - canvasWidth) * 0.5 + "px";
		}
	} else {
		canvasWidth = windowWidth;
		canvasHeight = windowHeight;
	}

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	gl.viewportWidth = canvasWidth;
	gl.viewportHeight = canvasHeight;
	
	//hide menus, show demo canvas
	document.getElementById('playbutton').style.display = 'none';
	document.getElementById('status').style.display = 'none';
	document.getElementById('notes').style.display = 'none';
	document.getElementById("header").style.display = 'none';
	canvas.style.display = 'block';

	//dev-mode keys
	if (devmode) {
		document.onkeydown = debugKeys;
	}

	//I need a rising sound.
	if (devmode) {
		lastFPSTime = new Date();
		audioPlay();
	} else {
		setTimeout(audioPlay, 2000);
	}
}
