precision highp float;

uniform float time;
varying vec4 pos;

uniform sampler2D vignetteTex;
uniform sampler2D taustaTex;

uniform sampler2D iconsfiTex;
uniform sampler2D realpartyTex;

uniform sampler2D eightTex;
uniform sampler2D sevenTex;
uniform sampler2D sixTex;
uniform sampler2D fiveTex;
uniform sampler2D fourTex;
uniform sampler2D threeTex;

uniform sampler2D noiseTex;

uniform sampler2D fstartTex;
uniform sampler2D fcreditsTex;
uniform sampler2D fkewlersTex;
uniform sampler2D fkallioTex;
uniform sampler2D fcoldplayTex;
uniform sampler2D f35Tex;

//uniform sampler2D c35Tex;
//uniform sampler2D cfTex;
//uniform sampler2D cmTex;
//uniform sampler2D ccTex;

float randd(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 radar(vec4 color, vec2 p, float t) {
	vec4 c = color;
	
	float angle = atan(-p.x, -p.y);
	if (angle+3.1415 < t*70.0) c = color - vec4(0.3, 0.3, 0.3, 0.0);
	
	return c;
}

void main(void) {
	vec4 color;
	vec2 coord = (pos.xy + vec2(1.0)) * 0.5;
	float random = randd(vec2(time, time*time))*0.005;
	coord += random;
	vec4 ppos = pos + random;
	
	color = vec4(1.0, 1.0, 1.0, 1.0);

	if (time > 0.5 && time < 1.1) {
		//radar
		if (time < 0.6)
			color = radar(color, ppos.xy, time-0.5);
		else if (time < 0.7)
			color = radar(color, ppos.xy, time-0.6);
		else if (time < 0.8)
			color = radar(color, ppos.xy, time-0.7);
		else if (time < 0.9)
			color = radar(color, ppos.xy, time-0.8);
		else if (time < 1.0)
			color = radar(color, ppos.xy, time-0.9);
		else if (time < 1.1)
			color = radar(color, ppos.xy, time-1.0);
			
		//grid
		if (length(ppos.x) < 0.0015) color = vec4(0.0, 0.0, 0.0, 1.0);
		if (length(ppos.y) < 0.003) color = vec4(0.0, 0.0, 0.0, 1.0);
		
		vec2 numcoord;
		vec2 pp1 = vec2(0.33, 0.25);
		vec2 pp2 = vec2(0.7, 0.75);
		if (coord.x > pp1.x && coord.y > pp1.y && coord.x < pp2.x && coord.y < pp2.y) {
			numcoord.y = (coord.y - pp1.y) / (pp2.y - pp1.y);
			numcoord.x = (coord.x - pp1.x) / (pp2.x - pp1.x);
			if (time < 0.6) {
				color -= texture2D(eightTex, numcoord);
			} else if (time < 0.7) {
				color -= texture2D(sevenTex, numcoord);
			} else if (time < 0.8) {
				color -= texture2D(sixTex, numcoord);
			} else if (time < 0.9) {
				color -= texture2D(fiveTex, numcoord);
			} else if (time < 1.0) {
				color -= texture2D(fourTex, numcoord);

				//credits
/*				vec2 rrealcoord;
				vec2 pp1, pp2;
				pp1 = vec2(0.0, 0.4);
				pp2 = vec2(1.0, 0.95);

				if (coord.x > pp1.x && coord.y > pp1.y && coord.x < pp2.x && coord.y < pp2.y) {
					rrealcoord.y = (coord.y - pp1.y) / (pp2.y - pp1.y);
					rrealcoord.x = (coord.x - pp1.x) / (pp2.x - pp1.x);
					color -= vec4(1.0) - texture2D(Tex, rrealcoord);
				}*/

			} else if (time < 1.1) {
				color -= texture2D(threeTex, numcoord);
			}
		}
		
	}
/*
	if (time > 1.15) {
		//real party and icons.fi
		vec2 realcoord;
		vec2 p1, p2;
		if (time < 1.95) {
			p1 = vec2(0.20, -0.5 + max(time - 1.8, 0.0));
			p2 = vec2(1.1, 0.65 + max(time - 1.8, 0.0));
		} else {
			p1 = vec2(0.20, -0.5 + 0.15);
			p2 = vec2(1.1, 0.65 + 0.15);
		}
		
		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= texture2D(realpartyTex, realcoord) * min(sin(time-1.15)*2.0, 1.0);
		}
	}

	if (time > 1.8) {
		vec2 iconsficoord;
		vec2 p1 = vec2(0.1935, -0.5);
		vec2 p2 = vec2(0.8, 0.45);
		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			iconsficoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			iconsficoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= texture2D(iconsfiTex, iconsficoord) * min(sin(time-1.8)*2.0, 1.0);
		}
	}
*/

	if (time > 0.1 && time < 0.12) {
		//credits
		vec2 realcoord;
		vec2 p1, p2;
		p1 = vec2(0.0, 0.4);
		p2 = vec2(1.0, 0.95);

		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= vec4(1.0) - texture2D(fcreditsTex, realcoord);
		}
	}

	if (time > 0.2 && time < 0.22) {
		//coldplay
		vec2 realcoord;
		vec2 p1, p2;
		p1 = vec2(0.0, -0.3);
		p2 = vec2(0.9, 0.55);

		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= vec4(1.0) - texture2D(fcoldplayTex, realcoord);
		}
	}

	if (time > 0.3 && time < 0.32) {
		//35
		vec2 realcoord;
		vec2 p1, p2;
		p1 = vec2(0.0, 0.1);
		p2 = vec2(0.9, 0.95);

		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= vec4(1.0) - texture2D(f35Tex, realcoord);
		}
	}

	if (time > 0.35 && time < 0.36) {
		//35
		vec2 realcoord;
		vec2 p1, p2;
		p1 = vec2(0.1, 0.1);
		p2 = vec2(0.9, 0.95);

		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= vec4(1.0) - texture2D(f35Tex, realcoord);
		}
	}

	if (time > 0.37 && time < 0.39) {
		//kallio
		vec2 realcoord;
		vec2 p1, p2;
		p1 = vec2(0.1, 0.1);
		p2 = vec2(0.9, 0.55);

		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			//color -= vec4(1.0) - texture2D(fkallioTex, realcoord);
		}
	}

	if (time > 0.40 && time < 0.42) {
		//f to kewlers
		vec2 realcoord;
		vec2 p1, p2;
		p1 = vec2(0.0, 0.4);
		p2 = vec2(1.0, 0.95);

		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= vec4(1.0) - texture2D(fkewlersTex, realcoord);
		}
	}

	if (time > 0.47 && time < 0.49) {
		//picture start
		vec2 realcoord;
		vec2 p1, p2;
		p1 = vec2(0.1, 0.1);
		p2 = vec2(0.9, 0.85);

		if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
			realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
			realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
			color -= vec4(1.0) - texture2D(fstartTex, realcoord);
		}
	}

	vec4 text1, text2;
	if (time > 1.25) {
		if (time > 1.25) {
			//real party and icons.fi
			vec2 realcoord;
			vec2 p1, p2;
			p1 = vec2(0.20, -0.5);
			p2 = vec2(1.1, 0.65);
	
			if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
				realcoord.y = (coord.y - p1.y) / (p2.y - p1.y);
				realcoord.x = (coord.x - p1.x) / (p2.x - p1.x);
				text1 = texture2D(realpartyTex, realcoord) * min(sin(time-1.25)*1.0, 1.0);
			}
		}

		if (time > 1.8) {
			vec2 iconsficoord;
			vec2 p1 = vec2(0.23, -0.5);
			vec2 p2 = vec2(0.8, 0.65);
			if (coord.x > p1.x && coord.y > p1.y && coord.x < p2.x && coord.y < p2.y) {
				iconsficoord.y = (coord.y - p1.y) / (p2.y - p1.y);
				iconsficoord.x = (coord.x - p1.x) / (p2.x - p1.x);
				text2 = texture2D(iconsfiTex, iconsficoord) * min(sin(time-1.8)*2.0, 1.0);
			}
		}
		
		color -= mix(text1, text2, min((time-1.8)*5.0, 1.0));
	}

	//vignette
	color -= (vec4(1.0) - texture2D(vignetteTex, coord));
		
	//noiselayer
	float noiselayer = texture2D(taustaTex, coord).r*0.7 + randd(vec2(time, time))*0.3;
	float noiselayer2 = texture2D(taustaTex, coord).r*0.7 + randd(vec2(time, time))*0.3;
	float noiselayer3 = texture2D(taustaTex, vec2(1.0) - coord.xy).r*1.5 + randd(vec2(time, time))*0.3;
	float noise = mix(noiselayer, noiselayer2, sin(time*10.0) * 0.5 + 0.5);
//	noise = mix(noise, noiselayer3, sin(time*5.0) * 0.5 + 0.5);
	color *= noise;
	
	if (time > 0.5 && time < 1.1) {
		//circles
		vec4 ratiopos = ppos;
		ratiopos.x *= 16.0/9.0;
		if (length(vec2(ratiopos.xy)) > 0.72 && length(vec2(ratiopos.xy)) < 0.73)
		color *= 1.2;
		//		color = vec4(1.0, 1.0, 1.0, 1.0);
		if (length(vec2(ratiopos.xy)) > 0.8 && length(vec2(ratiopos.xy)) < 0.81)
		color *= 1.2;
		//		color = vec4(1.0, 1.0, 1.0, 1.0);
	}
	
	//noise artefacts
	color -= (vec4(1.0) - texture2D(noiseTex, coord))*0.5;
	
	//fade in
	if (time < 0.1) {
		color = mix(vec4(0.0, 0.0, 0.0, 0.0), color, sin(time)*10.0);		
	}
	
	//fade out
	if (time > 2.4) {
		color = mix(color, vec4(0.0, 0.0, 0.0, 0.0), sin(time-2.4)*10.0);
	}
	
	gl_FragColor = color;
}
