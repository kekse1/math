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
const	radix = {};
export	default radix;

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
	radix.zigzag = {};
	
	radix.zigzag.encode = (_value, _throw = _default.throw) => {
		if(Number.isFinite(_value))
		{
			return radix.zigzag.encode.Number(_value);
		}
		
		if(typeof _value === 'bigint')
		{
			return radix.zigzag.encode.BigInt(_value);
		}
		
		if(_throw)
		{
			throw new Error('Invalid _value argument');
		}
		
		return null;
	};
	
	radix.zigzag.decode = (_value, _throw = _default.throw) => {
		if(Number.isFinite(_value))
		{
			return radix.zigzag.decode.Number(_value);
		}
		
		if(typeof _value === 'bigint')
		{
			return radix.zigzag.decode.BigInt(_value);
		}
		
		if(_throw)
		{
			throw new Error('Invalid _value argument');
		}
		
		return null;
	};
	
	radix.zigzag.encode.Number = (_n) => ((_n >= 0) ? (_n * 2) : (-_n * 2 - 1));
	radix.zigzag.encode.BigInt = (_n) => ((_n >= 0n) ? (_n * 2n) : (-_n * 2n - 1n));
	radix.zigzag.decode.Number = (_n) => (((_n & 1) === 0) ? (_n / 2) : -((_n + 1) / 2));
	radix.zigzag.decode.BigInt = (_n) => (((_n & 1n) === 0n) ? (_n / 2n) : -((_n + 1n) / 2n));

	Number.zigzag = {};
	BigInt.zigzag = {};
	
	Reflect.defineProperty(Number.zigzag, 'encode', {
			value: radix.zigzag.encode.Number });
	Reflect.defineProperty(Number.zigzag, 'decode', {
			value: radix.zigzag.decode.Number });
	Reflect.defineProperty(BigInt.zigzag, 'encode', {
			value: radix.zigzag.encode.BigInt });
	Reflect.defineProperty(BigInt.zigzag, 'decode', {
			value: radix.zigzag.decode.BigInt });

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
	
	radix.fromBytes = {
		Number: (_bytes, _endianness = _default.endianness, _unsigned = _default.unsigned, _throw = _default.throw) => {
			if((_bytes = checkBytes(_bytes, _throw)) === null)
			{
				return null;
			}

			var	result = 0,
				mul = 1;
			
			switch(_endianness[0].toLowerCase())
			{
				case 'b':
					for(var i = _bytes.length - 1; i >= 0; --i)
					{
						result += (_bytes[i] * mul);
						mul *= 256;
					}
					break;
				case 'l':
					for(var i = 0; i < _bytes.length; ++i)
					{
						result += (_bytes[i] * mul);
						mul *= 256;
					}
					break;
				default:
					throw new Error('Invalid _endianness argument/configuration');
			}

			if(_unsigned)
			{
				return result;
			}
			
			return radix.zigzag.decode.Number(result);
		},
		BigInt: (_bytes, _endianness = _default.endianness, _unsigned = _default.unsigned, _throw = _default.throw) => {
			if((_bytes = checkBytes(_bytes, _throw)) === null)
			{
				return null;
			}

			var	result = 0n,
				mul = 1n;
			
			switch(_endianness[0].toLowerCase())
			{
				case 'b':
					for(var i = _bytes.length - 1; i >= 0; --i)
					{
						result += (BigInt(_bytes[i]) * mul);
						mul *= 256n;
					}
					break;
				case 'l':
					for(var i = 0; i < _bytes.length; ++i)
					{
						result += (BigInt(_bytes[i]) * mul);
						mul *= 256n;
					}
					break;
				default:
					throw new Error('Invalid _endianness argument/configuration');
			}

			if(_unsigned)
			{
				return result;
			}
			
			return radix.zigzag.decode.BigInt(result);
		}
	};
	
	radix.toBytes = (_value, _endianness = _default.endianness, _unsigned = _default.unsigned, _throw = _default.throw) => {
		if(typeof _value === 'bigint')
		{
			return radix.toBytes.BigInt(
				_value, _endianness,
				_unsigned, _throw);
		}
		
		if(Number.isFinite(_value))
		{
			return radix.toBytes.Number(
				_value, _endianness,
				_unsigned, _throw);
		}
		
		if(_throw)
		{
			throw new Error('Invalid value argument');
		}
		
		return null;
	};
	
	radix.toBytes.BigInt = (_value, _endianness = _default.endianness, _unsigned = _default.unsigned, _throw = _default.throw) => {
		const	result = [];
		var	rest = _value;
		
		if(!_unsigned)
		{
			rest = radix.zigzag.encode.BigInt(rest);
		}
		else if(rest < 0n)
		{
			throw new Error('You enabled _unsigned, but your value is below zero.');
		}

		if(rest === 0n)
		{
			result = [ 0 ];
		}
		else switch(_endianness[0].toLowerCase())
		{
			case 'b':
				do
				{
					result.unshift(Number(rest % 256n));
					rest /= 256n;
				}
				while(rest >= 1n);
				break;
			case 'l':
				do
				{
					result.push(Number(rest % 256n));
					rest /= 256n;
				}
				while(rest >= 1n);
				break;
			default:
				throw new Error('Invalid _endianness argument/configuration');
		}

		return new Uint8Array(result);
	};

	radix.toBytes.Number = (_value, _endianness = _default.endianness, _unsigned = _default.unsigned, _throw = _default.throw) => {
		const	result = [];
		var	rest = _value;
		
		if(!_unsigned)
		{
			rest = radix.zigzag.encode.Number(rest);
		}
		else if(rest < 0)
		{
			throw new Error('You enabled _unsigned, but your value is below zero.');
		}

		if(rest === 0)
		{
			result = [ 0 ];
		}
		else switch(_endianness[0].toLowerCase())
		{
			case 'b':
				do
				{
					result.unshift(Math.trunc(rest % 256));
					
					if(true)
					{
						rest = Math.trunc(rest / 256);
					}
					else
					{
						rest /= 256;
					}
				}
				while(rest >= 1);
				break;
			case 'l':
				do
				{
					result.push(Math.trunc(rest % 256));
					
					if(true)
					{
						rest = Math.trunc(rest / 256);
					}
					else
					{
						rest /= 256;
					}
				}
				while(rest >= 1);
				break;
			default:
				throw new Error('Invalid _endianness argument/configuration');
		}

		return new Uint8Array(result);
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
			throw new Error('todo');
		},
		'BigInt': () => {
			throw new Error('todo');
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
		if(typeof _string !== 'string')
		{
			return null;
		}

		if(_string.length === 0)
		{
			return '';
		}

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

		return ((negative ? '-' : '') +
			_string.substr(count));
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

		[ _string, _radix ] = radix.cast(
			_string, _radix);

		if((a = radix.sign(a))[0] === '-')
		{
			negative = true;
			a = a.substr(1);
		}
		else
		{
			negative = false;
		}

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

