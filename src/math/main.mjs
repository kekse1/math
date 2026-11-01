/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const
	DEFAULT_GLOBAL = true,
	DEFAULT_INITIALIZE = true;

//
import	DEFAULT from './default.mjs';

//
const	math =	{
			SYMBOL:	Symbol.
				for('https://kekse.biz/'),
			DEFAULT
		};

if(DEFAULT_GLOBAL)
{
	globalThis.math = math;
}

export	default math;

//
import	'./global.mjs';

//
import	helper from './helper.mjs';
	math.helper = helper;

import	func from './func.mjs';
	math.func = func;

import	timeout from './timeout.mjs';
	math.timeout = timeout;

import	random from './random.mjs';
	math.random = random;

import	radix from './radix.mjs';
	math.radix = radix;

import	size from './size.mjs';
	math.size = size;

import	time from './time.mjs';
	math.time = time;

import	clock from './clock.mjs';
	math.clock = math.time.clock = clock;

import	date from './date.mjs';
	math.date = date;

import	code from './code.mjs';
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

