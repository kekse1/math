#!/usr/bin/env node

//
const	COUNT = 8;

//
import	math from '../../../src/js/math.mjs';

//
for(var i = 0; i < COUNT; ++i)
{
	console.dir({	regular: Math.random(),
			crypto: Math.random.crypto()
		    });
}

