#!/usr/bin/env node

//
import	math from '../../../src/js/math.mjs';

//
const test = [
	'abc',
	'123.456.78',
	'1234',
	'234.90',
	'234.s'
];

for(const t of test)
{
	console.dir({ [t]: String.isDecimal(t) });
}

