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

var texturesLoaded = 0;
var texturesTotal = 0;
var texturesDone = 0;

function textureLoad(img) {
	var tmpTexture = gl.createTexture();
	tmpTexture.image = new Image();
	
	tmpTexture.image.onload = function() {
		handleLoadedTexture(tmpTexture);
	}

	tmpTexture.image.src = img;
	
	return tmpTexture;
}

function handleLoadedTexture(texture) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
	texturesLoaded++;
	
	if (texturesLoaded >= texturesTotal) {
		texturesDone = 1;
		isLoaded();
	}
}

