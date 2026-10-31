#!/usr/bin/env node

//
import	math from '../../src/math.mjs';

//
//TODO/bitte hier gleich compare w/ regular vanilla functions for it
//	(which don't work like 'Number.parseFloat(.., RADIX)'! ;-) ..
//

//
const	DEC = false;
const	COUNT = 10,
	MAX = ((2**32)-1),
	MIN = -MAX,
	ROUND = 14,
	RDX = Number.RADIX_MAX; // (62), btw.

//
const	integer = new Array(COUNT),
	float = new Array(COUNT),
	radix = new Array(COUNT),
	rendered = {},
	parsed = {},
	vanillaRendered = {},
	vanillaParsed = {};

for(var i = 0; i < COUNT; ++i)
{
	if(DEC)	radix[i] = 10;
	else	radix[i] = Math.random.radix(RDX);
	integer[i] = Math.random.int(MAX, MIN);
	float[i] = Math.random.float(MAX, MIN);
	float[i] = Math.round(float[i], Math.
		random.int(ROUND, 0, true));
}

var t, f; for(var i = 0; i < COUNT; ++i)
{
	rendered[integer[i] + '  // int (' + radix[i] + ')'] =
			t = integer[i].render(radix[i]);
	rendered[float[i] + '  // float (' + radix[i] + ')'] =
			f = float[i].render(radix[i]);

	parsed[t + '  // int (' + radix[i] + ')'] =
			Number.parse(t, radix[i]);
	parsed[f + '  // float (' + radix[i] + ')'] =
			Number.parse(f, radix[i]);

	if(Number.isHalfRadix(radix[i]))
	{
		vanillaRendered[float[i] + '  // float (' +
			radix[i] + ')'] = float[i].toString(radix[i]);
		vanillaParsed[t + '  // int (' + radix[i] + ')'] =
			Number.parseInt(integer[i], radix[i]);
	}
}

console.dir({	parsed, vanillaParsed,
		rendered, vanillaRendered	},
				{ compact: true });

