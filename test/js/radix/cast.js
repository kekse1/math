#!/usr/bin/env node

//
//FYI: SOON i'll extend the CAST also for BigInt in the way '(16n)*'. again..
//

//
const	COUNT = 12,
	WRONG = 4;
const	ROUND = 6;

//
import	math from '../../../src/js/math.mjs';

//
const	test = new Array(COUNT);

for(var i = 0; i < COUNT; ++i)
{
	test[i] = ('(' + Math.random.radix() + ')' +
			Math.round(Math.random.float(
				65535, -65535), ROUND));
}

for(var i = COUNT, j = 0; j < WRONG; ++i, ++j)
{
	test[i] = ('(' + Math.random.int(255, 63) + ')' +
		Math.round(Math.random.float(
			65535, -65535), ROUND));
}

//
var sub; for(const t of test)
{
	sub = t.cast(); console.dir({ [t]: {
		'cast': sub, 'parse': (sub[1] === null ?
			null : Number.parse(sub[0])) }});
}

