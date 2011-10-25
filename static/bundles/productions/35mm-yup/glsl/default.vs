attribute vec3 aVertexPosition;

varying vec4 pos;

void main(void) {
	pos = vec4(aVertexPosition, 1.0);
	gl_Position = vec4(aVertexPosition, 1.0);
}
