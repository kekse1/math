#!/usr/bin/env node

//
const	COUNT = 8;

//
import * as math from '../../src/math.mjs';

//
for(var i = 0; i < COUNT; ++i)
{
	console.dir({	regular: Math.random(),
			crypto: Math.random.crypto()
		    });
}

