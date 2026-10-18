/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */
 
//
const	MAX_STRING_LENGTH = 128;

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
	const	generateLookUpTable = (_alphabet, _uint8array = new Uint8Array(256)) => {
			if(!_uint8array) _uint8array = new
				Uint8Array(256).fill(255);
			for(var i = 0; i < _alphabet.length; ++i)
				_uint8array[_alphabet.
					charCodeAt(i)] = i;
			return _uint8array;
		};
	
	Reflect.defineProperty(radix, 'alphabet', {
		get: () => ({ ... _default.alphabet }) });
	Reflect.defineProperty(radix, 'ALPHABET', { value: [],
		writable: false, configurable: false });
	Reflect.defineProperty(radix, 'LOOKUP', {
		value: new Uint8Array(256).fill(255),
		writable: false, configurable: false });
	
	//
	//TODO/maybe we should also check if all the (possible) alphabets
	//		really start with the same characters or stuff!!?
	//
	(() => {
		const	longest = [ 0, '' ];
		var	len,
			min = 2,
			max = 0,
			nul = '0';

		for(const alpha in _default.alphabet)
		{
			if(_default.alphabet[alpha][0] !== nul)
			{
				throw new Error('Unexpected');
			}
			
			radix[alpha.toUpperCase()] = len =
				_default.alphabet[alpha].length;
			
			if(len > max)
			{
				max = len;
			}
			
			if(len > longest[0])
			{
				longest[0] = len;
				longest[1] = alpha;
			}
		}

		Reflect.defineProperty(radix, 'NULL', { value: nul,
			writable: false, configurable: false });
		Reflect.defineProperty(radix, 'MIN', { value: min,
			writable: false, configurable: false });
		Reflect.defineProperty(radix, 'MAX', { value: max,
			writable: false, configurable: false });

		generateLookUpTable(_default.
			alphabet[longest[1]],
				radix.LOOKUP);
	})();
	
	//
	radix.fromBytes = {
		// w/o (45)'-' and w/o (46)'.'!
		'Number': (_bytes) => {
			if(typeof _bytes === 'string')
			{
				_bytes = Uint8Array.create(_bytes);
			}
			else if(Number.isFinite(_bytes))
			{
				_bytes = new Uint8Array([ _bytes ]);
			}
			else if(! (Reflect.was(_bytes, 'Uint8Array') || Reflect.was(_bytes, 'Uint8ClampedArray')))
			{
				if(_default.throw)
				{
					throw new Error('Invalid argument');
				}
				
				return null;
			}
			
			var	result = 0,
				mul = 1;
			
			//.....
			//..
		},
		// here only positive integers,
		// full bandwidth of (256) bytes.
		'BigInt': (_bytes) => {
			if(typeof _bytes === 'string')
			{
				_bytes = Uint8Array.create(_bytes);
			}
			else if(Number.isFinite(_bytes))
			{
				_bytes = new Uint8Array([ _bytes ]);
			}
			else if(! (Reflect.was(_bytes, 'Uint8Array') || Reflect.was(_bytes, 'Uint8ClampedArray')))
			{
				if(_default.throw)
				{
					throw new Error('Invalid argument');
				}
				
				return null;
			}
			
			var	result = 0n,
				mul = 1n;
			
			//.....
			//..
		}
	};

	radix.toBytes = {
		'Number': (_value) => {
			if(!Number.isFinite(_value))
			{
				if(_default.throw)
				{
					throw new Error('Invalid argument');
				}
				
				return null;
			}
			
			var	result = '';
			
			//...
			
			return Uint8Array.create(result);
		},
		'BigInt': (_value) => {
			if(typeof _value !== 'bigint')
			{
				if(_default.throw)
				{
					throw new Error('Invalid argument');
				}
				
				return null;
			}
			
			var	result = '';
			
			//...
			
			return Uint8Array.create(result);
		}
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
		value: function(... _args) { return radix.
			toBytes.Number(this.valueOf(), ... _args); }});
	Reflect.defineProperty(BigInt.prototype, 'toBytes', {
		value: function(... _args) { return radix.
			toBytes.BigInt(this.valueOf(), ... _args); }});

	//
	//TODO/see (NEW) LOOK-UP-TABLE!!1 ;-D
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
	radix.isRadix = (_item, _radix = null) => {
		if(!Number.isFinite(_item))
		{
			return false;
		}
		
		if((_item % 1) !== 0)
		{
			return false;
		}
		
		return (_item >= radix.MIN && _item <= radix.MAX);
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
		
		var	radix = Number(_string.substring(1, idx));
		
		if(!radix.isRadix(radix))
		{
			return [ _string, _fallback || null ];
		}

		return [ _string.substr(idx + 1), radix ];
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
		
		const	[ a, b, negative, radix ] = prepared;
		var	index;
		
		//
		for(var i = 0; i < a.length; ++i)
		{
			index = LOOKUP[a.charCodeAt(i)];
			
			if((index + 1) > radix)
			{
				return false;
			}
		}
		
		for(var i = 0; i < b.length; ++i)
		{
			index = LOOKUP[b.charCodeAt(i)];
			
			if((index + 1) > radix)
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

		while(a[count] === radix.NULL)
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
			
			while(b[b.length - count - 1] === radix.NULL)
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
		
		if(_radix <= radix.HALF)
		{
			a = a.toLowerCase();
			b = b.toLowerCase();
		}
		
		return [ a, b, negative, _radix ];
	};
	
	//
	Reflect.defineProperty(Number, 'isRadix', { value: radix.isRadix });
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

