/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const
	DEFAULT_INITIALIZE = true;

//
import	DEFAULT from './default.mjs';
const	math = globalThis.math =	{
		SYMBOL:	Symbol.for(
			'https://kekse.biz/'),
		THROW:	DEFAULT.throw,
		FUNC: {},
		DEFAULT			};

export	default math;

//
import	helper from './math/helper.mjs';
	math.helper = helper;

import	func from './math/func.mjs';
	math.func = func;
	
import	random from './math/random.mjs';
	math.random = random;

import	radix from './math/radix.mjs';
	math.radix = radix;

import	size from './math/size.mjs';
	math.size = size;

import	time from './math/time.mjs';
	math.time = time;

import	clock from './math/clock.mjs';
	math.clock = math.time.clock = clock;

import	code from './math/code.mjs';
	math.code = code;

//
//...
//..
//

//
math.initialize = () => {
	for(const module in math)
	{
		try
		{
			if(typeof math[module].initialize !== 'function')
			{
				continue;
			}
		}
		catch(_err)
		{
			continue;
		}

		if(!math[module][math.SYMBOL])
		{
			math[module].initialize(math, DEFAULT);
			math[module][math.SYMBOL] = new Date();
		}

		delete math[module].initialize;
	}
	
	delete math.initialize;
};

if(DEFAULT_INITIALIZE)
{
	math.initialize();
}

//

