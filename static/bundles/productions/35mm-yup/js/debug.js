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

function debugKeys(e) {
	var keyId = e.keyCode;

	switch (keyId) {
		case 32: //space
			audioPause();
			break;
		case 37: //left
			if (audio.currentTime - 0.5 < 0.0) {
				audio.currentTime = 0.0;
			} else {
				audio.currentTime -= 0.5;
			}
			break;
		case 39: //right
			audio.currentTime += 0.5;
			break;
		case 38: //up
			audio.currentTime += 2.5;
			break;
		case 40: //down
			if (audio.currentTime - 2.5 < 0.0) {
				audio.currentTime = 0.0;
			} else {
				audio.currentTime -= 2.5;
			}
			break;
		case 82: //r
			demoInit();
			break;
	}
}
