#!/usr/bin/env node

//
import	math from '../../../src/math.mjs';

//
const	DEC = true;
const	COUNT = 10, ROUND = 12,
	MAX = ((2**32)-1), MIN = -MAX,
	RDX = Number.RADIX_MAX; // (62), btw.

//
var	radix, float;

for(var i = 0; i < COUNT; ++i)
{
	const result = {};

	if(DEC)
	{
		radix = 10;
	}
	else
	{
		radix = Math.random.radix(RDX);
	}
	
	float = Math.random.float(MAX, MIN);
	
	if(Number.isFinite(ROUND) && ROUND >= 1)
	{
		float = Math.round(float, ROUND);
	}
	
	result.radix = radix;
	result.float = float;

	result.kekse = {};

	result.kekse.rendered = float.render(radix);
	result.kekse.parsed = Number.parse(
		result.kekse.rendered, radix);
	result.kekse.parsedInt = Number.parse(
		result.kekse.rendered, radix, false);
	result.kekse.parsedBigInt = BigInt.parse(
		result.kekse.rendered, radix);
	result.kekse.renderedBigInt = result.kekse.
		parsedBigInt.render(radix);

	result.vanilla = {
		renderedBigInt: result.kekse.
		parsedBigInt.toString(radix) };

	if(Number.isHalfRadix(radix))
	{
		result.vanilla.rendered = float.
				toString(radix);
		result.vanilla.parsed = Number.parseInt(
			result.vanilla.rendered, radix);
		result.vanilla.renderedBigInt =
			result.kekse.parsedBigInt.
				toString(radix);
	}
	else
	{
		result.vanilla = null;
	}
	
	console.dir({ [ 'Test (' + (i + 1) + ' / ' + COUNT + ')' ]:
					result }, { compact: false });
}
