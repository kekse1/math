#!/usr/bin/env node

//
import	math from '../../src/math.mjs';

//
//TODO/bitte hier gleich compare w/ regular vanilla functions for it
//	(which don't work like 'Number.parseFloat(.., RADIX)'! ;-) ..
//

//
const	DEC = true;
const	COUNT = 10,
	MAX = ((2**32)-1),
	MIN = -MAX,
	ROUND = 12,
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
	rendered['(' + radix[i] + ')' + integer[i]] =
		t = integer[i].render(radix[i]);
	rendered['(' + radix[i] + ')' + float[i]] =
		f = float[i].render(radix[i]);

	parsed['(' + radix[i] + ')' + t] =
		Number.parse(t, radix[i]);
	parsed['(' + radix[i] + ')' + f] =
		Number.parse(f, radix[i]);

	if(Number.isHalfRadix(radix[i]))
	{
		vanillaRendered['(' + radix[i] + ')' + integer[i]] =
			integer[i].toString(radix[i]);
		vanillaRendered['(' + radix[i] + ')' + float[i]] =
			float[i].toString(radix[i]);
		vanillaParsed['(' + radix[i] + ')' + t] =
			Number.parseInt(integer[i], radix[i]);
		vanillaParsed['(' + radix[i] + ')' + f] = null;
	}
	else
	{
		vanillaRendered['(' + radix[i] + ')' + integer[i]] =
			vanillaRendered['(' + radix[i] + ')' + float[i]] =
			vanillaParsed['(' + radix[i] + ')' + t] =
			vanillaParsed['(' + radix[i] + ')' + f] =
				null;
	}
}

console.dir({	parsed, vanillaParsed,
		rendered, vanillaRendered	},
				{ compact: true });

