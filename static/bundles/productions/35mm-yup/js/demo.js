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

//TODO:
//- music to config.js

var curTime=0.0;
var prevTime=0.0;
var drawnFrames=0;
var lastFPSTime=0;
var curFPS=0;
//var FPSTime=0;

//shader vars
var shader_default;

//texture vars
var vignetteTex = null;
var taustaTex = null;
var realpartyTex = null;
var iconsfiTex = null;
var eightTex = null;
var sevenTex = null;
var sixTex = null;
var fiveTex = null;
var fourTex = null;
var threeTex = null;
var noise1Tex = null;
var noise2Tex = null;
var noise3Tex = null;
var noise4Tex = null;
var noise5Tex = null;
var noise6Tex = null;
var noise7Tex = null;
var fstartTex = null;
var fcreditsTex = null;
var fkewlersTex = null;
var fkallioTex = null;
var fcoldplayTex = null;
var f35Tex = null;
/*var c35Tex = null;
var cfTex = null;
var cmTex = null;
var ccTex = null;*/
texturesTotal = 23;

//buffer vars
var screenVertexBuffer;
var screenIndexBuffer;

function demoInit() {
	if (loadDone == 0) {
		//put here stuff that only is inited _ONCE_, on the startup
		
		screenVertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, screenVertexBuffer);
		vertices = [
			-1.0, -1.0, -1.0,
			-1.0,  1.0, -1.0,
			 1.0,  1.0, -1.0,
			 1.0, -1.0, -1.0
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		screenVertexBuffer.itemSize = 3;
		screenVertexBuffer.numItems = 24;

		screenIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenIndexBuffer);
		var cubeVertexIndices = [
			0, 1, 2,
			0, 2, 3
		];
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
		screenIndexBuffer.itemSize = 1;
		screenIndexBuffer.numItems = 6;
	}

	//here be stuff that can be reloaded during demo
	
	loadMessage("Loading shaders...");
	shadersInit();
	
	loadMessage("Loading textures...");
	texturesInit();
}

function shadersInit() {	
	//default (test) shader
	shader_default = shaderLoad("glsl/default.vs", "glsl/default.fs");
	shader_default.vertexPositionAttribute = gl.getAttribLocation(shader_default, "aVertexPosition");
	gl.enableVertexAttribArray(shader_default.vertexPositionAttribute);
	
	shader_default.uTime = gl.getUniformLocation(shader_default, "time");
	
	shader_default.vignetteTex = gl.getUniformLocation(shader_default, "vignetteTex");	
	shader_default.taustaTex = gl.getUniformLocation(shader_default, "taustaTex");	
	shader_default.realpartyTex = gl.getUniformLocation(shader_default, "realpartyTex");	
	shader_default.iconsfiTex = gl.getUniformLocation(shader_default, "iconsfiTex");	

	shader_default.eightTex = gl.getUniformLocation(shader_default, "eightTex");	
	shader_default.sevenTex = gl.getUniformLocation(shader_default, "sevenTex");	
	shader_default.sixTex = gl.getUniformLocation(shader_default, "sixTex");	
	shader_default.fiveTex = gl.getUniformLocation(shader_default, "fiveTex");	
	shader_default.fourTex = gl.getUniformLocation(shader_default, "fourTex");	
	shader_default.threeTex = gl.getUniformLocation(shader_default, "threeTex");	

	shader_default.noiseTex = gl.getUniformLocation(shader_default, "noiseTex");
	
	shader_default.fstartTex = gl.getUniformLocation(shader_default, "fstartTex");
	shader_default.fcreditsTex = gl.getUniformLocation(shader_default, "fcreditsTex");
	shader_default.fkewlersTex = gl.getUniformLocation(shader_default, "fkewlersTex");
	shader_default.fkallioTex = gl.getUniformLocation(shader_default, "fkallioTex");
	shader_default.fcoldplayTex = gl.getUniformLocation(shader_default, "fcoldplayTex");
	shader_default.f35Tex = gl.getUniformLocation(shader_default, "f35Tex");
	
/*	shader_default.c35Tex = gl.getUniformLocation(shader_default, "c35Tex");
	shader_default.cfTex = gl.getUniformLocation(shader_default, "cfTex");
	shader_default.cmTex = gl.getUniformLocation(shader_default, "cmTex");
	shader_default.ccTex = gl.getUniformLocation(shader_default, "ccTex");	*/
}

function texturesInit() {
	//misc effect textures
	if (vignetteTex != null) {gl.deleteTexture(vignetteTex);}
	vignetteTex = textureLoad("img/vignette.jpg");

	if (taustaTex != null) {gl.deleteTexture(taustaTex);}
	taustaTex = textureLoad("img/tausta2_new2dark_gray.png");

	//end text textures
	if (realpartyTex != null) {gl.deleteTexture(realpartyTex);}
	realpartyTex = textureLoad("img/real_demoparty.png");

	if (iconsfiTex != null) {gl.deleteTexture(iconsfiTex);}
	iconsfiTex = textureLoad("img/iconsfi.png");

	//num textures
	if (eightTex != null) {gl.deleteTexture(eightTex);}
	eightTex = textureLoad("img/8.png");

	if (sevenTex != null) {gl.deleteTexture(sevenTex);}
	sevenTex = textureLoad("img/7.png");

	if (sixTex != null) {gl.deleteTexture(sixTex);}
	sixTex = textureLoad("img/6.png");

	if (fiveTex != null) {gl.deleteTexture(fiveTex);}
	fiveTex = textureLoad("img/5.png");

	if (fourTex != null) {gl.deleteTexture(fourTex);}
	fourTex = textureLoad("img/4.png");

	if (threeTex != null) {gl.deleteTexture(threeTex);}
	threeTex = textureLoad("img/3.png");

	//noise textures
	if (noise1Tex != null) {gl.deleteTexture(noise1Tex);}
	noise1Tex = textureLoad("img/noise1.png");

	if (noise2Tex != null) {gl.deleteTexture(noise2Tex);}
	noise2Tex = textureLoad("img/noise2.png");

	if (noise3Tex != null) {gl.deleteTexture(noise3Tex);}
	noise3Tex = textureLoad("img/noise3.png");

	if (noise4Tex != null) {gl.deleteTexture(noise4Tex);}
	noise4Tex = textureLoad("img/noise4.png");

	if (noise5Tex != null) {gl.deleteTexture(noise5Tex);}
	noise5Tex = textureLoad("img/noise5.png");

	if (noise6Tex != null) {gl.deleteTexture(noise6Tex);}
	noise6Tex = textureLoad("img/noise6.png");

	if (noise7Tex != null) {gl.deleteTexture(noise7Tex);}
	noise7Tex = textureLoad("img/noise7.png");
	
	//flash pictures
	if (fstartTex != null) {gl.deleteTexture(fstartTex);}
	fstartTex = textureLoad("img/flash_start.png");

	if (fcreditsTex != null) {gl.deleteTexture(fcreditsTex);}
	fcreditsTex = textureLoad("img/flash_credits.png");

	if (fkewlersTex != null) {gl.deleteTexture(fkewlersTex);}
	fkewlersTex = textureLoad("img/flash_kewlers.png");

	if (fkallioTex != null) {gl.deleteTexture(fkallioTex);}
	fkallioTex = textureLoad("img/flash_kallio.png");

	if (fcoldplayTex != null) {gl.deleteTexture(fcoldplayTex);}
	fcoldplayTex = textureLoad("img/flash_coldplay.png");

	if (f35Tex != null) {gl.deleteTexture(f35Tex);}
	f35Tex = textureLoad("img/flash_35.png");
	
	//chars
	/*if (c35Tex != null) {gl.deleteTexture(c35Tex);}
	c35Tex = textureLoad("img/char_35.png");
	
	if (cfTex != null) {gl.deleteTexture(cfTex);}
	cfTex = textureLoad("img/char_f.png");
	
	if (cmTex != null) {gl.deleteTexture(cmTex);}
	cmTex = textureLoad("img/char_m.png");
	
	if (ccTex != null) {gl.deleteTexture(ccTex);}
	ccTex = textureLoad("img/char_c.png");*/
}

function demoMain() {

	function demoLoop() {
		if (demoDone) {
			return;
		}

		curTime = audio.currentTime/60.0 * audioBPM * 0.1;
		var deltaTime = curTime - prevTime;
		prevTime = curTime;

		//drawing starts
		shaderUse(shader_default);

		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.uniform1f(currentShader.uTime, curTime);

		gl.bindBuffer(gl.ARRAY_BUFFER, screenVertexBuffer);
		gl.vertexAttribPointer(currentShader.vertexPositionAttribute, screenVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, iconsfiTex);
		gl.uniform1i(currentShader.iconsfiTex, 0);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, vignetteTex);
		gl.uniform1i(currentShader.vignetteTex, 1);		

		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, taustaTex);
		gl.uniform1i(currentShader.taustaTex, 2);		

		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, realpartyTex);
		gl.uniform1i(currentShader.realpartyTex, 3);		

		gl.activeTexture(gl.TEXTURE4);

		if (curTime % 0.07 > 0.0 && curTime % 0.07 < 0.01)
			gl.bindTexture(gl.TEXTURE_2D, noise1Tex);
		else if (curTime % 0.07 > 0.01 && curTime % 0.07 < 0.02)
			gl.bindTexture(gl.TEXTURE_2D, noise2Tex);
		else if (curTime % 0.07 > 0.02 && curTime % 0.07 < 0.03)
			gl.bindTexture(gl.TEXTURE_2D, noise3Tex)
		else if (curTime % 0.07 > 0.03 && curTime % 0.07 < 0.04)
			gl.bindTexture(gl.TEXTURE_2D, noise4Tex);
		else if (curTime % 0.07 > 0.04 && curTime % 0.07 < 0.05)
			gl.bindTexture(gl.TEXTURE_2D, noise5Tex);
		else if (curTime % 0.07 > 0.05 && curTime % 0.07 < 0.06)
			gl.bindTexture(gl.TEXTURE_2D, noise6Tex);
		else
			gl.bindTexture(gl.TEXTURE_2D, noise7Tex);

		gl.uniform1i(currentShader.noiseTex, 4);

		if (curTime > 0.5) {
			gl.activeTexture(gl.TEXTURE5);
			gl.bindTexture(gl.TEXTURE_2D, eightTex);
			gl.uniform1i(currentShader.eightTex, 5);		

			gl.activeTexture(gl.TEXTURE6);
			gl.bindTexture(gl.TEXTURE_2D, sevenTex);
			gl.uniform1i(currentShader.sevenTex, 6);		

			gl.activeTexture(gl.TEXTURE7);
			gl.bindTexture(gl.TEXTURE_2D, sixTex);
			gl.uniform1i(currentShader.sixTex, 7);		

			gl.activeTexture(gl.TEXTURE8);
			gl.bindTexture(gl.TEXTURE_2D, fiveTex);
			gl.uniform1i(currentShader.fiveTex, 8);		

			gl.activeTexture(gl.TEXTURE9);
			gl.bindTexture(gl.TEXTURE_2D, fourTex);
			gl.uniform1i(currentShader.fourTex, 9);		

			gl.activeTexture(gl.TEXTURE10);
			gl.bindTexture(gl.TEXTURE_2D, threeTex);
			gl.uniform1i(currentShader.threeTex, 10);		
		} else {
			gl.activeTexture(gl.TEXTURE5);
			gl.bindTexture(gl.TEXTURE_2D, fstartTex);
			gl.uniform1i(currentShader.fstartTex, 5);			

			gl.activeTexture(gl.TEXTURE6);
			gl.bindTexture(gl.TEXTURE_2D, fcreditsTex);
			gl.uniform1i(currentShader.fcreditsTex, 6);			

			gl.activeTexture(gl.TEXTURE7);
			gl.bindTexture(gl.TEXTURE_2D, fkewlersTex);
			gl.uniform1i(currentShader.fkewlersTex, 7);			

			gl.activeTexture(gl.TEXTURE8);
			gl.bindTexture(gl.TEXTURE_2D, fkallioTex);
			gl.uniform1i(currentShader.fkallioTex, 8);			

			gl.activeTexture(gl.TEXTURE9);
			gl.bindTexture(gl.TEXTURE_2D, fcoldplayTex);
			gl.uniform1i(currentShader.fcoldplayTex, 9);			

			gl.activeTexture(gl.TEXTURE10);
			gl.bindTexture(gl.TEXTURE_2D, f35Tex);
			gl.uniform1i(currentShader.f35Tex, 10);			
		}

/*		gl.activeTexture(gl.TEXTURE11);
		gl.bindTexture(gl.TEXTURE_2D, c35Tex);
		gl.uniform1i(currentShader.c35Tex, 11);			

		gl.activeTexture(gl.TEXTURE12);
		gl.bindTexture(gl.TEXTURE_2D, cfTex);
		gl.uniform1i(currentShader.cfTex, 12);			

		gl.activeTexture(gl.TEXTURE13);
		gl.bindTexture(gl.TEXTURE_2D, cmTex);
		gl.uniform1i(currentShader.cmTex, 13);			

		gl.activeTexture(gl.TEXTURE14);
		gl.bindTexture(gl.TEXTURE_2D, ccTex);
		gl.uniform1i(currentShader.ccTex, 14);	*/		
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenIndexBuffer);
		gl.drawElements(gl.TRIANGLES, screenIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

		if (devmode) {
			drawnFrames += 1;
			if (drawnFrames > 30) {
				var FPSTime = new Date();
				curFPS = drawnFrames / ((FPSTime.getTime() - lastFPSTime.getTime()) / 1000);
				drawnFrames = 0;
				lastFPSTime = FPSTime;
			}

			document.title = curTime.toFixed(4) + " " + curFPS.toFixed(2);
		}
		setTimeout(demoLoop, 0);
	}

	if (demoDone) {
		//add what to show after demo is done hereh
		return;
	} else {
		setTimeout(demoLoop, 0);
	}
}
