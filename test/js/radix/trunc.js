#!/usr/bin/env node

import	math from '../../../src/math.mjs';

const	string = [
		'',
		'1234',
		'1234.5678',
		'1234.5678.9abc' ];

for(const s of string)
{
	console.dir({ [s]: s.trunc() });
}

