/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */
 
//
const
	ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	LOOKUP = (() => {
		const result = new Uint8Array(256).fill(255);
		for(var i = 0; i < ALPHABET.length; ++i)
			result[ALPHABET.charCodeAt(i)] = i;
		return result; })(),
	RADIX_MIN = 2, RADIX_MAX = ALPHABET.length,
	RADIX_HALF = 36, RADIX_FULL = 62,
	MAX_STRING_LENGTH = 128;

//
const radix = {};
export default radix;

//
radix.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	//
	Reflect.defineProperty(radix, 'maxStringLength', {
		value: MAX_STRING_LENGTH,
		writable: false,
		configurable: false });

	//
	Reflect.defineProperty(radix, 'alphabet', { value:
		ALPHABET, writable: false, configurable: false });
	Reflect.defineProperty(radix, 'LOOKUP', { value:
		LOOKUP, writable: false, configurable: false });
	
	Reflect.defineProperty(Number, 'RADIX_MIN', { value: RADIX_MIN,
		writable: false, configurable: false });
	Reflect.defineProperty(Number, 'RADIX_MAX', { value: RADIX_MAX,
		writable: false, configurable: false });
	Reflect.defineProperty(radix, 'MIN', { value: RADIX_MIN,
		writable: false, configurable: false });
	Reflect.defineProperty(radix, 'MAX', { value: RADIX_MAX,
		writable: false, configurable: false });

	//
	const resultExceedsLimit = (_value, _throw = _default.throw) => {
		if(_throw)
		{
			throw new Error('Value exceeds limit (' +
				_value.toLocaleString() + ' / ' +
				Number.MAX_SAFE_INTEGER.
				toLocaleString() + ')');
		}
		
		return null;
	}
	
	radix.zigzag = { BigInt: {}, Number: {} };
	radix.zigzag.BigInt.encode = (_n) => ((_n >= 0n) ? (_n * 2n) : (-_n * 2n - 1n));
	radix.zigzag.BigInt.decode = (_n) => (((_n && 1n) === 0n) ? (_n / 2n) : -((_n + 1n) / 2n));
	radix.zigzag.Number.encode = (_n) => ((_n >= 0) ? (_n * 2) : (-_n * 2 - 1));
	radix.zigzag.Number.decode = (_n) => (((_n && 1) === 0) ? (_n / 2) : -((_n + 1) / 2));

	Number.zigzag = {}; BigInt.zigzag = {};
	
	Reflect.defineProperty(Number.zigzag, 'encode', {
			value: radix.zigzag.Number.encode });
	Reflect.defineProperty(Number.zigzag, 'decode', {
			value: radix.zigzag.Number.decode });
	Reflect.defineProperty(BigInt.zigzag, 'encode', {
			value: radix.zigzag.BigInt.encode });
	Reflect.defineProperty(BigInt.zigzag, 'decode', {
			value: radix.zigzag.BigInt.decode });

	const checkBytes = (_bytes, _throw = _default.throw) => {
		if(typeof _bytes === 'string')
		{
			return Uint8Array.create(_bytes);
		}
		
		if(isDataArray(_bytes))
		{
			return _bytes;
		}
		
		if(Number.isFinite(_bytes))
		{
			return new Uint8Array([
				Math.trunc(Math.abs(_bytes)) ]);
		}

		if(_throw)
		{
			throw new Error('Invalid _bytes argument');
		}
		
		return null;
	};
	
	//
	//TODO/bedenke evtl. weitere parse()-routine mit hilfs-func. etc.!??????
	//
	radix.fromBytes = {
		Number: (_bytes, _throw = _default.throw) => {
			if((_bytes = checkBytes(_bytes, _throw)) === null)
			{
				return null;
			}

			var	result = 0,
				mul = 1;
			
			//...
			//..
			
			//
			return radix.zigzag.Number.decode(result);
		},
		BigInt: (_bytes, _throw = _default.throw) => {
			if((_bytes = checkBytes(_bytes, _throw)) === null)
			{
				return null;
			}

			var	result = 0n,
				mul = 1n;
			
			//...
			//..
			
			//
			return radix.zigzag.BigInt.decode(result);
		}
	};
	
	radix.toBytes = (_value, _string = _default.string, _throw = _default.throw) => {
		if(typeof _value === 'bigint')
		{
			return radix.toBytes.BigInt(_value, _string, _throw);
		}
		
		if(Number.isFinite(_value))
		{
			return radix.toBytes.Number(_value, _string, _throw);
		}
		
		if(_throw)
		{
			throw new Error('Invalid value argument');
		}
		
		return null;
	};
	
	radix.toBytes.BigInt = (_value, _string = _default.string, _throw = _default.throw) => {
		var	rest = radix.zigzag.BigInt.encode(_value),
			result;

		if(rest === 0n)
		{
			result = ALPHABET[0];
		}
		else
		{
			result = '';
			
			do
			{
				result = (String.fromCharCode(
					Number(rest % 256n)) +
						result);
				rest /= 256n;
			}
			while(rest >= 1n);
		}
		
		if(_string)
		{
			return result;
		}
		
		return Uint8Array.create(result);
	};

	radix.toBytes.Number = (_value, _string = _default.string, _throw = _default.throw) => {
		var	rest = radix.zigzag.Number.encode(_value),
			result;

		if(rest === 0)
		{
			result = ALPHABET[0];
		}
		else
		{
			result = '';
			
			do
			{
				result = (String.fromCharCode(
					Math.trunc(rest % 256)) +
						result);
				rest /= 256;
			}
			while(rest >= 1);
		}
		
		if(_string)
		{
			return result;
		}
		
		return Uint8Array.create(result);
	};

	Reflect.defineProperty(Number, 'fromBytes', {
		value: radix.fromBytes.Number });
	Reflect.defineProperty(BigInt, 'fromBytes', {
		value: radix.fromBytes.BigInt });
	Reflect.defineProperty(Number, 'toBytes', {
		value: radix.toBytes.Number });
	Reflect.defineProperty(BigInt, 'toBytes', {
		value: radix.toBytes.BigInt });
	Reflect.defineProperty(Number.prototype, 'toBytes', {
		value: function(... _args) { return radix.toBytes.
			Number(this.valueOf(), ... _args); }});
	Reflect.defineProperty(BigInt.prototype, 'toBytes', {
		value: function(... _args) { return radix.toBytes.
			BigInt(this.valueOf(), ... _args); }});

	//
	//TODO/see (NEW) LOOK-UP-TABLE!!1 ;-D
	//TODO/don't forget ZIGZAG - MAYBE?! ...
	//
	radix.parse = {
		'Number': () => {
		
		},
		'BigInt': () => {
		
		}
	};
	
	radix.render = {
		'Number': () => {
		
		},
		'BigInt': () => {
		
		}
	};

	Reflect.defineProperty(Number, 'parse', {
		value: radix.parse.Number });
	Reflect.defineProperty(BigInt, 'parse', {
		value: radix.parse.BigInt });
	Reflect.defineProperty(Number, 'render', {
		value: radix.render.Number });
	Reflect.defineProperty(BigInt, 'render', {
		value: radix.render.BigInt });
	Reflect.defineProperty(Number.prototype, 'render', {
		value: function(... _args) { return radix.render.
			Number(this.valueOf(), ... _args); }});
	Reflect.defineProperty(BigInt.prototype, 'render', {
		value: function(... _args) { return radix.render.
			BigInt(this.valueOf(), ... _args); }});
	
	Reflect.defineProperty(String, 'isNumeric', {
		value: radix.isNumeric });
	Reflect.defineProperty(String.prototype, 'isNumeric', {
		value: function(... _args) { return radix.
			isNumeric(this.valueOf(), ... _args); }});

	Reflect.defineProperty(globalThis, 'isNumeric', { get: (_value) => {
		if(typeof _value === 'bigint')
		{
			return true;
		}
		
		if(Number.isFinite(_value))
		{
			return true;
		}
		
		return false;
	}});
	
	Reflect.defineProperty(Number.prototype, 'isInteger', { get: function()
	{
		if(!Number.isFinite(this.valueOf()))
		{
			return null;
		}
		
		return ((this.valueOf() % 1) === 0);
	}});
	
	Reflect.defineProperty(Number.prototype, 'isFloat', { get: function()
	{
		if(!Number.isFinite(this.valueOf()))
		{
			return null;
		}
		
		return ((this.valueOf() % 1) !== 0);
	}});
	
	Reflect.defineProperty(String, 'isNumeric', { value: (_value, _radix = _default.radix) => {
		if(typeof _value !== 'string')
		{
			return null;
		}
		
		return radix.isNumeric(_value, _radix);
	}});
	
	Reflect.defineProperty(String, 'isInteger', { value: (_value, _radix = _default.radix) => {
		if(_string.includes('.'))
		{
			return false;
		}
		
		return radix.isNumeric(_string, _radix);
	}});
	
	Reflect.defineProperty(String, 'isFloat', { value: (_value, _radix = _default.radix) => {
		if(_string.split('.').length !== 2)
		{
			return false;
		}
		
		return radix.isNumeric(_string, _radix);
	}});
	
	//
	radix.isRadix = (_value) => {
		if(!Number.isFinite(_value))
		{
			return false;
		}
		
		if((_value % 1) !== 0)
		{
			return false;
		}
		
		return (_value >= RADIX_MIN && _value <= RADIX_MAX);
	};
	
	radix.isHalfRadix = (_value) => {
		if(!radix.isRadix(_value))
		{
			return null;
		}
		
		return (_value <= RADIX_HALF);
	};
	
	radix.isFullRadix = (_value) => {
		if(!radix.isRadix(_value))
		{
			return null;
		}
		
		return (_value > RADIX_HALF);
	};
	
	radix.sign = (_string) => {
		var	negative = false,
			count = 0;
		
		for(; count < _string.length; ++count)
		{
			if(_string[count] === '-')
			{
				negative = !negative;
			}
			else if(_string[count] !== '+')
			{
				break;
			}
		}

		return [ _string.substr(count),
			  negative ];
	};
	
	radix.cast = (_string, _fallback = _default.radix) => {
		if(_string[0] !== '(')
		{
			return [ _string, _fallback || null ];
		}
		
		const	idx = _string.indexOf(')', 1);
		
		if(idx === -1)
		{
			return [ _string, _fallback || null ];
		}
		
		const	result = Number(_string.substring(1, idx));
		
		if(!radix.isRadix(result))
		{
			return [ _string, _fallback || null ];
		}

		return [ _string.substr(idx + 1), result ];
	};

	radix.isNumeric = (_string, _radix = _default.radix) => {
		if(typeof _string === 'number')
		{
			return Number.isFinite(_string);
		}
		else if(typeof _string === 'bigint')
		{
			return true;
		}
		else if(typeof _string !== 'string')
		{
			return null;
		}
		
		if(_string.length === 0)
		{
			return true;
		}
		
		const	prepared = prepareConversion(
				_string, _radix);
			
		if(!prepared)
		{
			return false;
		}
		
		const	[ a, b, negative, rdx ] = prepared;
		var	index;
		
		//
		for(var i = 0; i < a.length; ++i)
		{
			index = LOOKUP[a.charCodeAt(i)];
			
			if((index + 1) > rdx)
			{
				return false;
			}
		}
		
		for(var i = 0; i < b.length; ++i)
		{
			index = LOOKUP[b.charCodeAt(i)];
			
			if((index + 1) > rdx)
			{
				return false;
			}
		}
		
		return true;
	};

	const prepareConversion = (_string, _radix = _default.radix) => {
		if(typeof _string !== 'string')
		{
			return null;
		}
		
		if(_string.length > MAX_STRING_LENGTH)
		{
			return null;
		}
		
		const	split = _string.split('.');
		
		if(split.length > 2)
		{
			return null;
		}
		
		var	[ a, b ] = split,
			count = 0,
			negative;

		[ _string, _radix ] = radix.cast(_string, _radix);
		[ a, negative ] = radix.sign(a);

		while(a[count] === ALPHABET[0])
		{
			++count;
		}
		
		if(count)
		{
			a = a.substr(count);
		}
		
		if(b)
		{
			count = 0;
			
			while(b[b.length - count - 1] === ALPHABET[0])
			{
				++count;
			}
			
			if(count)
			{
				b = b.slice(0, -count);
			}
		}
		else
		{
			b = '';
		}
		
		if(radix.isHalfRadix(_radix))
		{
			a = a.toLowerCase();
			b = b.toLowerCase();
		}
		
		return [ a, b, negative, _radix ];
	};
	
	//
	Reflect.defineProperty(Number, 'isRadix', { value: radix.isRadix });
	Reflect.defineProperty(Number, 'isHalfRadix', { value: radix.isHalfRadix });
	Reflect.defineProperty(Number, 'isFullRadix', { value: radix.isFullRadix });
	Reflect.defineProperty(Number, 'sign', { value: radix.sign });
	Reflect.defineProperty(Number, 'cast', { value: radix.cast });

	//
	radix.findRadix = (_string) => {
		const	prepared = prepareConversion(
				_string, null);
		
		if(!prepared)
		{
			return null;
		}
		
		const	[ a, b ] = prepared;
		var	max = 0,
			index;
		
		for(var i = 0; i < a.length; ++i)
		{
			index = radix.LOOKUP.full[a.charCodeAt(i)];
			
			if(index > max)
			{
				max = index;
			}
		}
		
		for(var i = 0; i < b.length; ++i)
		{
			index = radix.LOOKUP.full[b.charCodeAt(i)];
			
			if(index > max)
			{
				max = index;
			}
		}
		
		if(max > radix.MAX)
		{
			return null;
		}
		
		return max;
	};
	
	//

};

//

