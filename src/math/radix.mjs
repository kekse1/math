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
		configurable: false,
		enumerable: true });

	//
	Reflect.defineProperty(radix, 'alphabet', { value:
		ALPHABET, writable: false, configurable: false,
		enumerable: true });
	Reflect.defineProperty(radix, 'LOOKUP', { value:
		LOOKUP, writable: false, configurable: false,
		enumerable: false });
	
	Reflect.defineProperty(Number, 'RADIX_MIN', { value: RADIX_MIN,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(Number, 'RADIX_MAX', { value: RADIX_MAX,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(radix, 'MIN', { value: RADIX_MIN,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(radix, 'MAX', { value: RADIX_MAX,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(Number, 'RADIX_HALF', { value: RADIX_HALF,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(Number, 'RADIX_FULL', { value: RADIX_FULL,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(radix, 'HALF', { value: RADIX_HALF,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(radix, 'FULL', { value: RADIX_FULL,
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
		value: radix.zigzag.encode.Number,
		writable: false, configurable: false,
		enumerable: true });
	Reflect.defineProperty(Number.zigzag, 'decode', {
		value: radix.zigzag.decode.Number,
		writable: false, configurable: false,
		enumerable: true });
	Reflect.defineProperty(BigInt.zigzag, 'encode', {
		value: radix.zigzag.encode.BigInt,
		writable: false, configurable: false,
		enumerable: true });
	Reflect.defineProperty(BigInt.zigzag, 'decode', {
		value: radix.zigzag.decode.BigInt,
		writable: false, configurable: false,
		enumerable: true });

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
			
			if(_endianness) switch(_endianness[0].toLowerCase())
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
			else
			{
				throw new Error('Invalid _endianness');
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
			
			if(_endianness) switch(_endianness[0].toLowerCase())
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
			else
			{
				throw new Error('Invalid _endianness');
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
		else if(_endianness) switch(_endianness[0].toLowerCase())
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
		else
		{
			throw new Error('Invalid _endianness');
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
		else if(_endianness) switch(_endianness[0].toLowerCase())
		{
			case 'b':
				do
				{
					result.unshift(rest % 256);
					rest = Math.trunc(rest / 256);
				}
				while(rest >= 1);
				break;
			case 'l':
				do
				{
					result.push(rest % 256);
					rest = Math.trunc(rest / 256);
				}
				while(rest >= 1);
				break;
			default:
				throw new Error('Invalid _endianness argument/configuration');
		}
		else
		{
			throw new Error('Invalid _endianness');
		}

		return new Uint8Array(result);
	};

	Reflect.defineProperty(Number, 'fromBytes', {
		value: radix.fromBytes.Number,
		enumerable: true, writable: false,
		configurable: false });
	Reflect.defineProperty(BigInt, 'fromBytes', {
		value: radix.fromBytes.BigInt,
		enumerable: true, writable: false,
		configurable: false });
	Reflect.defineProperty(Number, 'toBytes', {
		value: radix.toBytes.Number,
		enumerable: true, writable: false,
		configurable: false });
	Reflect.defineProperty(BigInt, 'toBytes', {
		value: radix.toBytes.BigInt,
		enumerable: true, writable: false,
		configurable: false });
	Reflect.defineProperty(Number.prototype, 'toBytes', {
		value: function(... _args) { return radix.toBytes.
			Number(this.valueOf(), ... _args); },
		enumerable: true, writable: false, configurable: false });
	Reflect.defineProperty(BigInt.prototype, 'toBytes', {
		value: function(... _args) { return radix.toBytes.
			BigInt(this.valueOf(), ... _args); },
		enumerable: true, writable: false, configurable: false });

	//
	radix.parse = {
		'Number': (_string, _radix = _default.radix, _float = _default.float, _throw = _default.throw) => {
			const	prepared = prepareConversion(_string, _radix);
			
			if(!prepared)
			{
				if(_throw)
				{
					throw new Error('Invalid argument(s)');
				}
				
				return null;
			}

			const	[ a, b, negative, rdx ] = prepared;
			var	result = 0,
				mul = 1,
				index;

			for(var i = a.length - 1; i >= 0; --i)
			{
				index = LOOKUP[a.charCodeAt(i)];
				
				if((index + 1) > rdx)
				{
					if(_throw)
					{
						throw new Error('Invalid character[' + i + ']');
					}
					
					return null;
				}
				
				result += (index * mul);
				mul *= rdx;
			}

			if(b && _float)
			{
				mul = (1 / rdx);

				for(var i = 0; i < b.length; ++i)
				{
					index = LOOKUP[b.charCodeAt(i)];
					
					if((index + 1) > rdx)
					{
						if(_throw)
						{
							throw new Error('Invalid character[' + i + ']');
						}
						
						return null;
					}
					
					result += (index * mul);
					mul /= rdx;
				}
			}

			if(negative)
			{
				result = (-result || 0);
			}
			
			return result;	
		},
		'BigInt': (_string, _radix = _default.radix, _throw = _default.throw) => {
			const	prepared = prepareConversion(_string, _radix);
			
			if(!prepared)
			{
				if(_throw)
				{
					throw new Error('Invalid argument(s)');
				}
				
				return null;
			}
			
			const	[ a, b, negative, rdx ] = prepared,
				big = BigInt(rdx);
			var	result = 0n,
				mul = 1n,
				index;

			for(var i = a.length - 1; i >= 0; --i)
			{
				index = LOOKUP[a.charCodeAt(i)];
				
				if((index + 1) > rdx)
				{
					if(_throw)
					{
						throw new Error('Invalid character[' + i + ']');
					}
					
					return null;
				}
				
				result += (BigInt(index) * mul);
				mul *= big;
			}

			if(negative)
			{
				result = (-result || 0);
			}
			
			return result;
		}
	};
	
	radix.render = (_value, _radix = _default.radix, _float = _default.float, _throw = _default.throw) => {
		if(typeof _value === 'number')
		{
			return radix.render.Number(_value, _radix, _float, _throw);
		}
		
		if(typeof _value === 'bigint')
		{
			return radix.render.BigInt(_value, _radix, _throw);
		}
		
		if(_throw)
		{
			throw new Error('Invalid _value argument');
		}
		
		return null;
	};
	
	radix.render.Number = (_value, _radix = _default.radix, _float = _default.float, _throw = _default.throw) => {
		if(!Number.isFinite(_value))
		{
			if(_throw)
			{
				throw new Error('Invalid _value');
			}

			return null;
		}

		if(!radix.isRadix(_radix))
		{
			if(_throw)
			{
				throw new Error('Invalid _radix');
			}

			return null;
		}

		const	negative = (_value < 0);
		var	rest = _value,
			result = '',
			index;
		
		if(negative)
		{
			rest = _value = (-rest || 0);
		}

		do
		{
			index = Math.trunc(rest % _radix);
			result = (ALPHABET[index] + result);
			rest /= _radix;
		}
		while(rest >= 1);

		if(_float && (rest = (_value % 1)))
		{
			var	started = false,
				bResult = '',
				zero = 0;

			while(rest % 1)
			{
				rest *= _radix;
				
				if(!started && rest < 1)
				{
					++zero;
				}
				else
				{
					started = true;
				}
			}

			do
			{
				index = Math.trunc(rest % _radix);
				bResult = (ALPHABET[index] + bResult);
				rest /= _radix;
			}
			while(rest >= 1);
			
			if(bResult)
			{
				result += '.';
				
				while(--zero >= 0)
				{
					result += ALPHABET[0];
				}
				
				result += bResult;
			}
		}
		
		if(negative)
		{
			result = ('-' + result);
		}
		
		return result;
	};
	
	radix.render.BigInt = (_value, _radix = _default.radix, _throw = _default.throw) => {
		if(typeof _value !== 'bigint')
		{
			if(_throw)
			{
				throw new Error('Invalid _value');
			}

			return null;
		}

		if(!radix.isRadix(_radix))
		{
			if(_throw)
			{
				throw new Error('Invalid _radix');
			}

			return null;
		}

		const	negative = (_value < 0n),
			rdx = BigInt(_radix);
		var	rest = _value,
			result = '',
			index;
		
		if(negative)
		{
			rest = (-rest || 0n);
		}

		do
		{
			index = Number(rest % rdx);
			result = (ALPHABET[index] + result);
			rest /= rdx;
		}
		while(rest >= 1n);
		
		if(negative)
		{
			result = ('-' + result);
		}
		
		return result;
	};
	
	//
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
		
		const	prepared = prepareConversion(_string, _radix);
			
		if(!prepared)
		{
			return false;
		}
		
		const	[ a, b, negative, rdx ] = prepared;
		var	index;

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

	Reflect.defineProperty(Number, 'parse', {
		value: radix.parse.Number,
		enumerable: true,
		writable: false,
		configurable: false });
	Reflect.defineProperty(BigInt, 'parse', {
		value: radix.parse.BigInt,
		enumerable: true,
		writable: false,
		configurable: false });
	Reflect.defineProperty(Number, 'render', {
		value: radix.render.Number,
		enumerable: true,
		writable: false,
		configurable: false });
	Reflect.defineProperty(BigInt, 'render', {
		value: radix.render.BigInt,
		enumerable: true,
		writable: false,
		configurable: false });
	Reflect.defineProperty(Number.prototype, 'render', {
		value: function(... _args) { return radix.render.
			Number(this.valueOf(), ... _args); },
		enumerable: true, writable: false, configurable: false });
	Reflect.defineProperty(BigInt.prototype, 'render', {
		value: function(... _args) { return radix.render.
			BigInt(this.valueOf(), ... _args); },
		enumerable: true, writable: false, configurable: false });
	
	Reflect.defineProperty(String, 'isNumeric', {
		value: radix.isNumeric,
		enumerable: false,
		writable: false,
		configurable: false });
	Reflect.defineProperty(String.prototype, 'isNumeric', {
		value: function(... _args) { return radix.
			isNumeric(this.valueOf(), ... _args); },
		enumerable: false,
		writable: false,
		configurable: false });

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
			return [ _string, null ];
			//return [ _string, _fallback || null ];
		}

		return [ _string.substr(idx + 1), result ];
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

		if(_radix === null)
		{
			return null;
		}

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
	//TODO/"BigInt" auch dazu?? und sonstwo auch noch was MIT dorthin!??
	//
	Reflect.defineProperty(Number, 'isRadix', { value: radix.isRadix,
		enumerable: true, writable: false, configurable: false });
	Reflect.defineProperty(Number, 'sign', { value: radix.sign,
		enumerable: true, writable: false, configurable: false });
	Reflect.defineProperty(String.prototype, 'sign', { value: function()
		{ return radix.sign(this.valueOf()); }});
	Reflect.defineProperty(Number, 'cast', { value: radix.cast,
		enumerable: true, writable: false, configurable: false });
	Reflect.defineProperty(String.prototype, 'cast', { value: function()
		{ return radix.cast(this.valueOf()); }});
	Reflect.defineProperty(Number, 'isHalfRadix', { value: radix.isHalfRadix,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(Number, 'isFullRadix', { value: radix.isFullRadix,
		writable: false, configurable: false, enumerable: true });
	
	//

};

//

