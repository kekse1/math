/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const	LOW = 11, HIGH = (2 ** 21),
	BUFFER = new Uint32Array(2),
	MAX = (Number.MAX_SAFE_INTEGER + 1);

//
const	random = {};
export	default random;

//
random.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	const	_random = Math.random.bind(Math);
	const	random = (_crypto = _default.crypto, _count = 1) => {
			if(_crypto)
			{
				crypto.getRandomValues(BUFFER);
				// Nutze 53 Bits (21 Bits aus dem ersten,
				// 32 Bits aus'm zweiten Array-Element)..
				const	high = (BUFFER[0] * HIGH),
					low = (BUFFER[1] >>> LOW);
				return ((high + low) / MAX);
			}
			
			return _random();
		};

	Reflect.defineProperty(Math, '_random', Reflect.
		getOwnPropertyDescriptor(Math, 'random'));
	Reflect.defineProperty(Math, 'random', {
		value: random, enumerable: true,
		writable: false, configurable: false });
	Math.random.crypto = (... _args) => random(true, ... _args);

	//
	random.bool = Math.random.bool = (_crypto = _default.crypto) => (Math.
					random(_crypto = _default.crypto) >= 0.5);
	random.bool.crypto = Math.random.bool.crypto = () => random.bool(true);

	random.int = Math.random.int = (_max = 255, _min = 0, _inclusive = true, _crypto = _default.crypto) => {
		[ _max, _min ] = [
			Math.trunc(Math.max(_max, _min)),
			Math.trunc(Math.min(_min, _max)) ];
		return ((Math.floor(Math.random(_crypto = _default.crypto) *
			(_max - _min + (_inclusive ? 1 : 0))) + _min) || 0);
	};
	
	random.int.crypto = Math.random.int.crypto =
		(... _args) => random.int(... _args.slice(0, 3), true);

	random.float = Math.random.float = (_max = 255, _min = 0, _inclusive = true, _crypto = _default.crypto) => {
		[ _max, _min ] = [
			Math.max(_max, _min),
			Math.min(_min, _max) ];
		return ((Math.random(_crypto = _default.crypto) *
			(_max - _min + (_inclusive ? 1 : 0)) + _min) || 0);
	};
	
	random.float.crypto = Math.random.float.crypto =
		(... _args) => random.float(... _args.slice(0, 3), true);

	random.bytes = Math.random.bytes = (_count = 1) => {
		return crypto.getRandomValues(
			new Uint8Array(_count || 1));
	};

	random.bytes.crypto = Math.random.bytes.crypto = random.bytes;

	random.color = Math.random.color = (_alpha = false) => {
		const result = new Array(_alpha ? 4 : 3);

		for(var i = 0; i < result.length; ++i)
		{
			result[i] = Math.random.int(255, 0);
		}

		return result;
	};

	//
	// all the following are w/ 'Knuth-Shuffle'- bzw. 'Fisher-Yates-Shuffle'-algo!
	//	.. a great thing. :-) ...
	//
	Reflect.defineProperty(String.prototype, 'randomize', { value: function(_crypto = _default.crypto)
	{
		return this.split('').randomize(_crypto).join('');
	}});
	
	Reflect.defineProperty(Array.prototype, 'randomize', { value: function(_crypto = _default.crypto)
	{
		var	a, b;
		
		for(var i = this.length - 1; i > 0; --i)
		{
			a = Math.random.int(i, 0, true, _crypto);
			b = this[i];
			this[i] = this[a];
			this[a] = b;
		}
		
		return this;
	}});

	Reflect.defineProperty(TypedArray.prototype, 'randomize', { value: function(_crypto = _default.crypto)
	{
		var	a, b;
		
		for(var i = this.length - 1; i > 0; --i)
		{
			a = Math.random.int(i, 0, true, _crypto);
			b = this[i];
			this[i] = this[a];
			this[a] = b;
		}
		
		return this;
	}});
	
	Reflect.defineProperty(Array.prototype, 'toRandomized', { value: function(_crypto = _default.crypto)
	{
		return this.slice().randomize(_crypto);
	}});
	
	Reflect.defineProperty(TypedArray.prototype, 'toRandomized', { value: function(_crypto = _default.crypto)
	{
		return new this.constructor(this).randomize(_crypto);
	}});

	//

};

//

