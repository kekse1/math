/*
* Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
* https://kekse.biz/ https://github.com/kekse1/v4/
*/

//
//Note: everywhere returns (result || 0) => to prevent from negative zero (-0)!!
//

//
const DEFAULT_BINARY = true;

//
export default Math;

//
Math._abs = Math.abs.bind(Math);

Math.abs = (_value, ... _args) => {
	var result;

	if(typeof _value === 'number')
	{
		result = Math._abs(_value, ... _args);
	}
	else if(typeof _value === 'bigint')
	{
		result = (_value < 0n ? -_value : _value);
	}
	else
	{
		return NaN;
	}

	return (result || 0);
};

//
Math._round = Math.round.bind(Math);
Math._floor = Math.floor.bind(Math);
Math._ceil = Math.ceil.bind(Math);

Math.round = (_value, _precision = 0) => {
	if(typeof _value === 'bigint')
	{
		return _value;
	}
	else if(typeof _value !== 'number')
	//else if(!Number.isNumber(_value))
	{
		return error('Invalid % argument', null, '_value');
	}
	
	if(typeof _precision !== 'number' || _precision < 0)
	//if(! (Number.isInt(_precision) && _precision >= 0))
	{
		_precision = 0;
	}

	if(_precision <= 0)
	{
		return (Math._round(_value) || 0);
	}

	const coefficient = Math.pow(10, _precision);
	return ((Math._round(_value * coefficient) / coefficient) || 0);
};

Math.floor = (_value, _precision = 0) => {
	if(typeof _value === 'bigint')
	{
		return _value;
	}
	else if(typeof _value !== 'number')
	//else if(!Number.isNumber(_value))
	{
		return error('Invalid % argument', null, '_value');
	}

	if(typeof _precision !== 'number' || _precision < 0)
	//if(! (Number.isInt(_precision) && _precision >= 0))
	{
		_precision = 0;
	}

	if(_precision <= 0)
	{
		return (Math._floor(_value) || 0);
	}

	const coefficient = Math.pow(10, _precision);
	return ((Math._floor(_value * coefficient) / coefficient) || 0);
};

Math.ceil = (_value, _precision = 0) => {
	if(typeof _value === 'bigint')
	{
		return _value;
	}
	else if(typeof _value !== 'number')
	//else if(!Number.isNumber(_value))
	{
		return error('Invalid % argument', null, '_value');
	}

	if(typeof _precision !== 'number' || _precision < 0)
	//if(! (Number.isInt(_precision) && _precision >= 0))
	{
		_precision = 0;
	}

	if(_precision <= 0)
	{
		return (Math._ceil(_value) || 0);
	}

	const coefficient = Math.pow(10, _precision);
	return ((Math._ceil(_value * coefficient) / coefficient) || 0);
};

//see 'Math.trunc()'! ;-)
/*Math.int = (_value, _precision = 0, _inverse = false) => {
	if(typeof _value === 'bigint')
	{
		return _value;
	}
	else if(typeof _value !== 'number')
	//else if(!Number.isNumber(_value))
	{
		return error('Invalid % argument', null, '_value');
	}

	if(typeof _precision !== 'number' || _precision < 0)
	//if(! (Number.isInt(_precision) && _precision >= 0))
	{
		_precision = 0;
	}

	const a = (_value < 0);
	const b = (!!_inverse);

	return (((((a&&b)||!(a||b)) ? Math.floor : Math.ceil)(_value, _precision)) || 0);
};*/

//
Math.min = (... _args) => {
	for(var i = 0; i < _args.length; ++i)
	{
		if(typeof _args[i] !== 'number' && typeof _args[i] !== 'bigint')
		{
			_args.splice(i--, 1);
		}
	}
	
	if(_args.length === 0)
	{
		return null;
	}
	
	var result = _args.shift();
	var orig;
	
	for(var i = 0; i < _args.length; ++i)
	{
		if(typeof result === 'bigint')
		{
			orig = _args[i];

			if(typeof _args[i] !== 'bigint')
			{
				_args[i] = BigInt.from(_args[i]);
			}
			
			if(_args[i] < result)
			{
				result = orig;
			}
		}
		else if(typeof _args[i] === 'bigint')
		{
			orig = _args[i];
			_args[i] = Number.from(_args[i]);
			
			if(_args[i] < result)
			{
				result = orig;
			}
		}
		else if(_args[i] < result)
		{
			result = _args[i];
		}
	}
	
	return (result || 0);
};

Math.max = (... _args) => {
	for(var i = 0; i < _args.length; ++i)
	{
		if(typeof _args[i] !== 'number' && typeof _args[i] !== 'bigint')
		{
			_args.splice(i--, 1);
		}
	}
	
	if(_args.length === 0)
	{
		return null;
	}

	var result = _args.shift();
	var orig;
			
	for(var i = 0; i < _args.length; ++i)
	{
		if(typeof result === 'bigint')
		{
			orig = _args[i];
			
			if(typeof _args[i] !== 'bigint')
			{
				_args[i] = BigInt.from(_args[i]);
			}
			
			if(_args[i] > result)
			{
				result = orig;
			}
		}
		else if(typeof _args[i] === 'bigint')
		{
			orig = _args[i];
			_args[i] = Number.from(_args[i]);
			
			if(_args[i] > result)
			{
				result = orig;
			}
		}
		else if(_args[i] > result)
		{
			result = _args[i];
		}
	}
	
	return (result || 0);
};

//
Math.random.value = (_types = null) => {
	const types = (Array.isArray(_types, false) ? _types : (String.isString(_types) ? [ _types ] : Object.getTypes(true, true)));
	const type = types[Math.random.int(types.length, 0, false)];

	switch(type)
	{
		case 'String':
			return Math.random.string(24, 4);
		case 'RegExp':
			const possibleFlags = RegExp.flags;
			var flags = '';

			for(const flag of possibleFlags)
			{
				if(Math.random.bool())
				{
					flags += flag;
				}
			}

			return new RegExp(
				Math.random.string(24, 4),
				flags);
		case 'Number':
			return Math.random.float((2 ** 16) - 1);
			/*return Math.round(
				Math.random.float((2 ** 16) - 1),
				Math.random.int(8, 0, true));*/
		case 'BigInt':
			return Math.random.bigint();
		case 'Boolean':
			return Math.random.bool();
		case 'Date':
			return Math.random.date();
	}

	throw new Error('Unexpected // invalid type: ' + type);
};

Math.random.bigint = (_max, _min, _max_inclusive = false) => {
	return BigInt(Math.random.int(_max, _min, _max_inclusive)); };

Math.random.int = (_max, _min, _max_inclusive = true) => {
	if(! Number.isNumber(_max))
	{
		_max = ((2**32) - 1);
	}

	if(! Number.isNumber(_min))
	{
		_min = 0;
	}

	if(typeof _max_inclusive !== 'boolean')
	{
		_max_inclusive = true;
	}

	const min = Math.trunc(Math.min(_min, _max));
	const max = Math.trunc(Math.max(_max, _min));

	return ((Math.floor(Math.random() * (max - min + (_max_inclusive ? 1 : 0))) + min) || 0);
};

Math.random.float = (_max = (2**32) - 1, _min = 0, _max_inclusive = true) => {
	if(! Number.isNumber(_max))
	{
		_max = (2**32)-1;
	}

	if(! Number.isNumber(_min))
	{
		_miin = 0;
	}

	if(typeof _max_inclusive !== 'boolean')
	{
		_max_inclusive = true;
	}

	const min = Math.min(_min, _max);
	const max = Math.max(_max, _min);

	return ((Math.random() * (max - min) + min) || 0);
};

Math.random.byte = (_max = 255, _min = 0) => {
	return Math.random.int(_max, _min, true);
};

Math.random.byte.space = (_max = 255, _min = 0, probability = 0.2) => {
	if(Math.random() <= 0.25) return 32;
	return Math.random.int(_max, _min, true);
};

Math.random.bytes = (_count_max = 1, _count_min = null, _max = 255, _min = 0) => {
	if(!Number.isInt(_count_max) || _count_max < 0) _count_max = 1;
	if(!Number.isInt(_count_min) || _count_min < 0) _count_min = null;
	const count = (_count_min === null ? _count_max : Math.random.int(_count_max, _count_min, true));
	const result = new Uint8Array(_count);
	for(var i = 0; i < _count; ++i) result[i] = Math.random.byte(_max, _min);
	return result;
};

Math.random.bool = () => {
	return (Math.random() >= 0.5);
};

Math.random.date = (_min = 1000000000000, _max = new Date().getTime()) => {
	return new Date(Math.random.int(_max, _min)); };

Math.random.char = () => alphabet.lower[Math.random.int(alphabet.lower.length, 0, false)];

Math.random.string = (_length_max = 32, _length_min = null, _alphabet = alphabet.lower) => {
	if(!Number.isInt(_length_max) || _length_max < 0) _length_max = 32;
	if(!Number.isInt(_length_min) || _length_min < 0) _length_min = null;
	if(! String.isString(_alphabet)) _alphabet = alphabet.lower;
	var length = (_length_min === null ? _length_max : Math.random.int(_length_max, _length_min, true));
	var result = ''; while(--length >= 0) result +=
		_alphabet[Math.random.int(_alphabet.length, 0, false)];
	return result;
};

Math.random.strings = (_count_max = 32, _count_min = null, _length_max = 32, _length_min = null, _alphabet = alphabet.lower) => {
	if(!Number.isInt(_count_min) || _count_min < 0) _count_min = null;
	if(!Number.isInt(_count_max)) _count_max = 32;
	const count = (_count_min === null ? _count_max : Math.random.int(_count_max, _count_min, true));
	const result = new Array(count); for(var i = 0; i < count; ++i)
		result[i] = Math.random.string(_length_max, _length_min, _alphabet);
	return result;
};

prepare(() => {
	const alphabets = alphabet.alphabets; for(const a of alphabets)
		Reflect.defineProperty(Math.random.string, a, {
			value: (_length_max, _length_min) => Math.random.string(_length_max, _length_min, alphabet[a]) }); });

//
Math.psin = (_value) => {
	if(! Number.isNumber(_value)) return error('Invalid % argument (not a %)', null, '_value', 'Number');
	return (((Math.sin(_value) + 1) / 2) || 0);
};

Math.pcos = (_value) => {
	if(! Number.isNumber(_value)) return error('Invalid % argument (not a %)', null, '_value', 'Number');
	return (((Math.cos(_value) + 1) / 2) || 0);
};

//
Math.deg2rad = (_degrees) => {
	if(! Number.isNumber(_degrees))
	{
		return error('Invalid % argument (not a %)', null, '_degrees', 'Number');
	}

	return ((_degrees * Math.PI / 180) || 0);
};

Math.rad2deg = (_radians) => {
	if(! Number.isNumber(_radians))
	{
		return error('Invalid % argument (not a %)', null, '_radians', 'Number');
	}

	return ((_radians * 180 / Math.PI) || 0);
};

//
Math.fraction = (_float, _tolerance = 1.0E-6, _radix = 10) => {
	//
	if(! Number.isNumber(_tolerance))
	{
		_tolerance = 1.0E-6;
	}

	if(!radix.isRadix(_radix))
	{
		_radix = 10;
	}
	
	//
	if(! Number.isNumber(_float))
	{
		return error('Invalid % argument (not a %)', null, '_float', 'Number');
	}
	else if(_float < 0)
	{
		return ('-' + Math.fraction(-_float, _tolerance, _radix));
	}
	else if(Number.isInt(_float))
	{
		return (_float.toString(_radix) + '/1');
	}
	
	//
	var h1 = 1, h2 = 0;
	var k1 = 0, k2 = 1;
	var b = _float;

	do
	{
		var a = Math.floor(b);
		var aux = h1;

		h1 = a * h1 + h2;
		h2 = aux;
		aux = k1;

		k1 = a * k1 + k2;
		k2 = aux;

		b = 1 / (b - a);
	}
	while(Math.abs(_float - h1 / k1) > _float * _tolerance);

	//
	return (h1.toString(_radix) + '/' + k1.toString(_radix));
};

//
Math.scale = (_value, _max = 100, _min = 0) => {
	if(! Number.isNumber(_value))
	{
		return error('Invalid % argument (not a %)', null, '_value', 'Number');
	}
	
	if(! Number.isNumber(_max))
	{
		_max = 100;
	}
	
	if(! Number.isNumber(_min))
	{
		_min = 0;
	}

	return (((_value * (_max - _min)) + _min) || 0);
};

Math.scale.in = Math.scale;
Math.scale.out = (_value, _max = 100, _min = 0) => {
	if(!Number.isNumber(_value))
	{
		return error('Invalid % argument (not a %)', null, '_value', 'Number');
	}

	if(!Number.isNumber(_max))
	{
		_max = 100;
	}

	if(!Number.isNumber(_min))
	{
		_min = 0;
	}

	return (((_value - _min) / (_max - _min)) || 0);
};

//
Math.getIndex = (_index, _length) => {
	if(Number.isNumber(_index))
	{
		_index = Math.trunc(_index);
	}
	else
	{
		return error('Invalid % argument', null, '_index');
	}
	
	if(Number.isNumber(_length))
	{
		_length = Math.trunc(_length);
	}
	else
	{
		return error('Invalid % argument', null, '_length');
	}
	
	if(_length < 1)
	{
		return null;
	}
	else if((_index %= _length) < 0)
	{
		_index = (_length + _index);
	}
	
	return (_index || 0);
};

//
const bigIntLogBase = (_base, _value) => {
	var result = 0;
	var rest = _value;

	while(rest >= _base)
	{
		rest /= _base;
		++result;
	}

	return (result || 0);
}

Math.logBase = (_base, _value) => {
	if(! numeric(_base))
	{
		return error('Invalid % argument', null, '_base');
	}

	if(typeof _value === 'bigint')
	{
		return bigIntLogBase(BigInt(_base), _value);
	}
	else if(Number.isNumber(_value))
	{
		_base = Number(_base);
	}
	else
	{
		return error('The % argument needs to be a % or %', null, '_value', 'Number', 'BigInt');
	}

	return ((Math.log(_value) / Math.log(_base)) || 0);
};

//
Math.gcd = (_a, _b, _binary = DEFAULT_BINARY) => {
	//
	if(! numeric(_a))
	{
		return error('Invalid % argument (not %)', null, '_a', 'numeric');
	}
	else if(! numeric(_b))
	{
		return error('Invalid % argument (not %)', null, '_b', 'numeric');
	}
	else if(typeof _a !== typeof _b)
	{
		return error('Invalid %/% arguments (not the same types)', null, '_a', '_b');
	}
	else if(typeof _binary !== 'boolean')
	{
		_binary = DEFAULT_BINARY;
	}

	//
	if(_binary)
	{
		return Math.gcd.binary(_a, _b);
	}

	return Math.gcd.euclidean(_a, _b);
};

// greatest common divisor - iterative function (binary algorithm, aka Stein's algorithm)
Math.gcd.binary = (_a, _b) => {
	//
	const bigint = (typeof _a === 'bigint' && typeof _b === 'bigint');
	const zero = (bigint ? 0n : 0);
	const one = (bigint ? 1n : 1);

	//
	if(_a === zero)
	{
		return (_b || 0);
	}
	else if(_b === zero)
	{
		return (_a || 0);
	}

	var shift = zero;
	while((_a & one) === zero && (_b & one) === zero)
	{
		_a >>= one;
		_b >>= one;
		++shift;
	}

	while((_a & one) === zero)
	{
		_a >>= one;
	}

	do
	{
		while((_b & one) === zero)
		{
			_b >>= one;
		}

		if(_a > _b)
		{
			[ _a, _b ] = [ _b, _a ];
		}

		_b -= _a;
	}
	while(_b !== zero)

	return ((_a << shift) || 0);
};

// greatest common divisor - recursive function (euclidean algorithm)
Math.gcd.euclidean = (_a, _b) => {
	const bigint = (typeof _a === 'bigint' && typeof _b === 'bigint');
	const zero = (bigint ? 0n : 0);

	if(_a === zero)
	{
		return (_b || 0);
	}
	else if(_b === zero)
	{
		return (_a || 0);
	}

	return (Math.gcd.euclidean(_b, _a % _b) || 0);
};

// least common multiple
Math.lcm = (_a, _b, _binary = DEFAULT_BINARY) => {
	if(! numeric(_a))
	{
		return error('Invalid % argument (not %)', null, '_a', 'numeric');
	}
	else if(! numeric(_b))
	{
		return error('Invalid % argument (not %)', null, '_b', 'numeric');
	}
	else if(typeof _a !== typeof _b)
	{
		return error('Invalid %/% arguments (not the same types)', null, '_a', '_b');
	}
	else if(typeof _binary !== 'boolean')
	{
		_binary = DEFAULT_BINARY;
	}

	const func = (_binary ? Math.gcd.binary : Math.gcd.euclidean);
	return (((_a * _b) / func(_a, _b)) || 0);
};

Math.lcm.binary = (_a, _b) => Math.lcm(_a, _b, true);
Math.lcm.euclidean = (_a, _b) => Math.lcm(_a, _b, false);

//
Math.px2pt = (_value) => (_value / 0.75);
Math.pt2px = (_value) => (_value * 0.75);

//
// "(binaeres) exponentielles backoff"... daemon styles. ^_^
//
Math.getTimeout = (_base = 1000, _step = 0, _limit = true) => {
	const result = (_base * (2 ** _step));
	if(_limit) return Math.min(
		result, Number.MAX_TIMEOUT);
	return result;
};

//
Math.sign = (_item, _string = false) => {
	if(typeof _item === 'number')
	{
		return (_item < 0 ? '-' : '+');
	}
	
	if(typeof _item !== 'string' || _item.length === 0)
	{
		return '';
	}
	
	_item = _item.trim();

	var negative = false, i = 0;
	
	for(; i < _item.length; ++i)
	{
		if(_item[i] === '-')
		{
			negative = !negative;
		}
		else if(_item[i] !== '+')
		{
			break;
		}
	}
	
	if(_string)
	{
		var sub = _item.substr(i);
		
		if(sub[0] === '.')
		{
			sub = '0.' + sub.substr(1);
		}

		return ((negative ? '-' : '+') + sub);
	}
	
	return (negative ? '-' : '+');
};

//
