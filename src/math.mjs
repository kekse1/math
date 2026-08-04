/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/    https://github.com/kekse1/math/
 * v10.0.0
 *
 *
 * [TODO] ... (w/ description, etc.. and please update GitHub)!
 * 
 *	# `math._extend(false)` (w/ `const EXTEND`); ...
 *	# ...
 *	# ..
 *	#
 *
 *
 */

//
// set to (true) for automatic `math._extend(false)`.
//
const EXTEND = true;

//
const math = {
	radix: {},
	size: {},
	time: {},
	clock: null, // here's a special `class`. ...
	MODULES: [ 'radix', 'size', 'time', 'clock' ],
	FALLBACK: 'kekse.biz',
	getExtensionSymbol: () => {
		var symbol;

		try
		{
			symbol = (import.meta?.url ||
				math.FALLBACK);
		}
		catch(_err)
		{
			symbol = math.FALLBACK;
		}

		return Symbol.for(symbol);
	}
};

export default math;

//
// RADIX
//
math.radix.parse = (_value, _options) => {
	throw new Error('todo');
};

math.radix.render = (_value, _options) => {
	throw new Error('todo');
};

//
// SIZE
//
math.size.parse = (_value, _options) => {
	throw new Error('todo');
};

math.size.render = (_value, _options) => {
	throw new Error('todo');
};

math.size.absolute = (_value, _options) => {
	throw new Error('todo');
};

math.size.relative = (_value, _options) => {
	throw new Error('todo');
};

//
// TIME
//
math.time.parse = (_value, _options) => {
	throw new Error('todo');
};

math.time.render = (_value, _options) => {
	throw new Error('todo');
};

math.time.absolute = (_value, _options) => {
	throw new Error('todo');
};

math.time.relative = (_value, _options) => {
	throw new Error('todo');
};

//
// CLOCK
//
math.clock = math.Clock = class Clock
{
	constructor(... _args)
	{
throw new Error('todo');
		this.reset();
	}

	reset()
	{
		return this.value = [
			0, 0, 0, 0  ];
	}

	static parse(_value, _options)
	{
		return new this.constructor().
			parse(_value, _options);
	}

	static render(_value, _options)
	{
	}

	parse(_value, _options)
	{
	}

	render(_options)
	{
		return this.constructor.
			render(this, _options);
	}
	
	toString()
	{
		return this.render();
	}

	get isToday()
	{
	}

	get isTomorrow()
	{
	}

	get am()
	{
	}

	set am(_bool)
	{
	}

	get pm()
	{
	}

	set pm(_bool)
	{
	}
}

math.time.clock = math.clock;
math.clock.time = math.time;

//
// EXTENDing global objects
//
math._extend = (_force = false) => {
	//
	const _symbol = math.
		getExtensionSymbol();

	if(Math[_symbol])
	{
		return false;
	}

	//
	for(const idx in math) if(math.MODULES.includes(idx))
	{
		Reflect.defineProperty(
			Math, idx, { value: math[idx] });
	}

	//
	//...
	//..
	//
	//
	
	//
	return Math[_symbol] = true;
};

if(EXTEND)
{
	math._extend(false);
}

//

