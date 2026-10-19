#!/usr/bin/env node

//
const	COUNT = 8;

//
import * as math from '../../src/math.mjs';

//
const	a = Math.random.bytes(COUNT),
	b = [ ... a ];

//
const	A = a.toRandomized(false),
	B = b.toRandomized(true);

//
console.dir({ a, b, A, B });
console.dir({
	'a === b': (a === b),
	'a === A': (a === A),
	'b === B': (b === B) });

