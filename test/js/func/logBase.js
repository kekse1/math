#!/usr/bin/env node

//
import	math from '../../../src/js/math.mjs';

//
console.dir({
	'(8, 2) => (3)': Math.logBase(8, 2),
	'(100, 10) => (2)': Math.logBase(100, 10),
	'(81, 3) => (4)': Math.logBase(81, 3)
}, { compact: false });

