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

var currentShader;

function fileLoad(url) {
	//ok, this might not be the right way, but it works for a demo hack
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);

	var data = httpReq.responseText;

	return data;
}

function shaderLoad(vertexFile, fragmentFile) {
	//fetch data from files
	var vertexData = fileLoad(vertexFile);
	var fragmentData = fileLoad(fragmentFile);

	//send data to be compiled
	return shaderCompile(vertexData, fragmentData)
}

function shaderCompile(vertexSource, fragmentSource) {
	//create necessities and compile shader
	var shader = gl.createProgram();

	var vs = gl.createShader(gl.VERTEX_SHADER);
	var fs = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vs, vertexSource);
	gl.shaderSource(fs, fragmentSource);

	gl.compileShader(vs);
	gl.compileShader(fs);

	if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
	{
		//abort mission, vshader failed!
		var infoLog = gl.getShaderInfoLog(vs);
		gl.deleteProgram(shader);
		loadError("VS ERROR: " + infoLog);
		return;
	}

	if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
	{
		//abort mission, fshader failed!
		var infoLog = gl.getShaderInfoLog(fs);
		gl.deleteProgram(shader);
		loadError("FS ERROR: " + infoLog);
		return;
	}

	//finalize and return
	gl.attachShader(shader, vs);
	gl.attachShader(shader, fs);

	gl.deleteShader(vs);
	gl.deleteShader(fs);

	gl.linkProgram(shader);

	return shader;
}

function shaderUse(shader) {
	currentShader = shader;
	gl.useProgram(currentShader);
}
