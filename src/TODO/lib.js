//LEITFADEN:
//please prefer own 'Math.' functions over Number.. implementation!
//e.g. 'Number.prototype.int' exists - but was not loaded while using function in here!
//in this case, 'Math.int()' was used, instead of using '(number).int'.. ^_^
//ALSO: Number.isInt/.. etc. are now w/o 'Number.' prefix.. (see main.js)

(function()
{

	//
	const UNEXPECTED_CODE = true;

	//
	const DEFAULT_DISABLE_CRYPTO = false;

	//
	const DEFAULT_RANDOM_NEGATIVE_DIVISION = 0.7;
	const DEFAULT_TIME_RENDER_STRING_COLORS = true;
	
	//
	const DEFAULT_KNUTH = true;
	
	//
	const DEFAULT_LONGEST_SHORTEST_SINGLE_LENGTH = null;
	const DEFAULT_LONGEST_SHORTEST_NUMERIC = true;

	//
	const _sin = Math.sin;
	const _cos = Math.cos;
	const _tan = Math.tan;

	Object.defineProperty(Math, 'sin', { value: function(_value, _positive = false)
	{
		var result;

		// this is mainly for animations, where both start and end are decreased in speed.. ;-)
		if(_positive)
		{
			result = ((_sin(_value) + 1) / 2);
		}
		else
		{
			result = _sin(_value);
		}

		return result;
	}});

	Object.defineProperty(Math, 'cos', { value: function(_value, _positive = false)
	{
		var result;

		if(_positive)
		{
			result = ((_cos(_value) + 1) / 2);
		}
		else
		{
			result = _cos(_value);
		}

		return result;
	}});

	Object.defineProperty(Math, 'abssin', { value: function(_value)
	{
		return Math.abs(Math.sin(_value, false));
	}});

	Object.defineProperty(Math, 'abscos', { value: function(_value)
	{
		return Math.abs(Math.cos(_value, false));
	}});

	Object.defineProperty(Math, 'ppsin', { value: function(_value)
	{
		return Math.sin(_value, true);
	}});

	Object.defineProperty(Math, 'ppcos', { value: function(_value)
	{
		return Math.cos(_value, true);
	}});

	Object.defineProperty(Math, 'psin', { value: function(_value)
	{
		return Math.ppsin(_value - (UNEXPECTED_CODE ? (Math.PI * 0.5) : 0));
	}});

	Object.defineProperty(Math, 'pcos', { value: function(_value)
	{
		return Math.ppcos(_value - (UNEXPECTED_CODE ? (Math.PI * 0.5) : 0));
	}});

	//
	Math.sin.deg = function(_degrees)
	{
		return Math.sin(Math.deg2rad(_degrees));
	}

	Math.cos.deg = function(_degrees)
	{
		return Math.cos(Math.deg2rad(_degrees));
	}

	Math.tan.deg = function(_degrees)
	{
		return Math.tan(Math.deg2rad(_degrees));
	}

	Object.defineProperty(Math, 'rad2deg', { value: function(_radians)
	{
		if(! Number.isNumber(_radians))
		{
			return x('Invalid % argument (not a %)', null, '_radians', 'Number');
		}

		return (_radians * 180 / Math.PI);
	}});

	Object.defineProperty(Math, 'deg2rad', { value: function(_degrees)
	{
		if(! Number.isNumber(_degrees))
		{
			return x('Invalid % argument (not a %)', null, '_degrees', 'Number');
		}

		return (_degrees * Math.PI / 180);
	}});

	//
	const cryptoInt = (_max, _min, _max_inclusive = true, _callback) => {
		if(_max === _min)
		{
			return _max;
		}
		else if(typeof _callback !== 'function')
		{
			_callback = undefined;
		}

		return crypto.randomInt(_min, _max, _callback, _max_inclusive, false, false);
	};

	const withCrypto = (_crypto = CRYPTO) => {
		return (_crypto && Math.crypto);
	};

	Object.defineProperty(Math, 'crypto', {
		get: function()
		{
			if(DEFAULT_DISABLE_CRYPTO)
			{
				return false;
			}

			return (typeof crypto === 'object' && crypto !== null && CRYPTO && typeof crypto.randomInt === 'function');
		},
		set: function(_value)
		{
			if(typeof _value === 'boolean')
			{
				return (CRYPTO = _value);
			}

			return CRYPTO;
		}
	});

	//
	const _random = Math.random;

	Object.defineProperty(Math, '_random', { value: _random });
	
	Object.defineProperty(Math, 'random', { value: function(_crypto = Math.crypto)
	{
		if(withCrypto(_crypto))
		{
			return Number('0.' + new Uint8Array(crypto.randomBytes(7)).toRadix(10));
		}

		return _random();
	}});

	Math.random.bool = Math.random.boolean = function(_crypto = Math.crypto)
	{
		return (Math.random(_crypto) >= 0.5);
	}

	Math.random.bits = function(_count = -32, _count_min = 1, _crypto = Math.crypto)
	{
zzzzzzzz
	}

	//
	Math.random.array = function(_count, _crypto = Math.crypto)
	{
		if(isInt(_count))
		{
			if(_count === 0)
			{
				return [];
			}
			else if(_count < 0)
			{
				_count = Math.random.int(-_count, 1, _crypto);
			}
		}
		else
		{
			return x('Invalid % argument (expecting a -/+ %)', null, '_count', 'Integer');
		}

		const result = new Array(_count);

		for(var i = 0; i < _count; i++)
		{
			result[i] = Math.random(_crypto);
		}

		return result;
	}

	Math.random.array.bool = Math.random.array.boolean = function(_count, _crypto = Math.crypto)
	{
		if(isInt(_count))
		{
			if(_count === 0)
			{
				return [];
			}
			else if(_count < 0)
			{
				_count = Math.random.int(-_count, 1, _crypto);
			}
		}
		else
		{
			return x('Invalid % argument (expecting a -/+ %)', null, '_count', 'Integer');
		}

		const result = new Array(_count);

		for(var i = 0; i < _count; i++)
		{
			result[i] = Math.random.bool(_crypto);
		}

		return result;
	}

	Math.random.array.byte = function(_count, _max = 255, _min = 0, _crypto = Math.crypto, _max_inclusive = true)
	{
		return Math.random.array.int(_count, _max, _min, _crypto, _max_inclusive);
	}

	Math.random.array.int = function(_count, _max = ((2 ** 32) - 1), _min = 0, _crypto = Math.crypto, _max_inclusive = true)
	{
		//
		if(isInt(_count))
		{
			if(_count === 0)
			{
				return [];
			}
			else if(_count < 0)
			{
				_count = Math.random.int(-_count, 1, _crypto);
			}
		}
		else
		{
			return x('Invalid % argument (expecting a -/+ %)', null, '_count', 'Integer');
		}

		//
		const result = new Array(_count);

		for(var i = 0; i < _count; i++)
		{
			result[i] = Math.random.int(_max, _min, _crypto, _max_inclusive);
		}

		return result;
	}

	Math.random.array.float = function(_count, _max = (2 ** 32), _min = 0, _crypto = Math.crypto, _max_inclusive = false)
	{
		//
		if(isInt(_count))
		{
			if(_count === 0)
			{
				return [];
			}
			else if(_count < 0)
			{
				_count = Math.random.int(-_count, 1, _crypto);
			}
		}
		else
		{
			return x('Invalid % argument (expecting a -/+ %)', null, '_count', 'Integer');
		}

		//
		const result = new Array(_count);

		for(var i = 0; i < _count; i++)
		{
			result[i] = Math.random.float(_max, _min, _crypto, _max_inclusive);
		}

		return result;
	}

	Math.random.array.bigint = function(_count, _bits_max = 64, _bits_min = 0, _crypto = Math.crypto)
	{
		if(isInt(_count))
		{
			if(_count === 0)
			{
				return [];
			}
			else if(_count < 0)
			{
				_count = Math.random.int(-_count, 1, _crypto);
			}
		}
		else
		{
			return x('Invalid % argument (expecting a -/+ %)', null, '_count', 'Integer');
		}

		const result = new Array(_count);

		for(var i = 0; i < _count; ++i)
		{
			result[i] = Math.random.bigint(_bits_max, _bits_min, _crypto);
		}

		return result;
	}

	Math.random.int = Math.random.integer = function(_max = ((2 ** 32) - 1), _min = 0, _crypto = Math.crypto, _max_inclusive = true)
	{
		const min = Math.int(Math._min(_min, _max));
		const max = Math.int(Math._max(_max, _min));

		if(min === max)
		{
			return min;
		}
		else if(withCrypto(_crypto))
		{
			return cryptoInt(max, min, _max_inclusive);
		}

		return (Math.floor(Math.random(_crypto) * (max - min + (_max_inclusive ? 1 : 0))) + min);
	}

	Math.random.float = function(_max = (2 ** 32), _min = 0, _crypto = Math.crypto, _max_inclusive = false)
	{
		const min = Math._min(_min, _max);
		const max = Math._max(_max, _min);

		if(min === max)
		{
			return min;
		}
		else if(min === max)
		{
			return min;
		}

		return (Math.random(_crypto) * (max - min) + min);
	}

	Math.random.bigint = function(_bits_max = 64, _bits_min = 0, _crypto = Math.crypto)
	{
		const min = Math.int(Math._min(_bits_min, _bits_max));
		const max = Math.int(Math._max(_bits_max, _bits_min));

		const bits = Math.random.int(max, min, _crypto, true);
		var result = 0n;

		for(var i = 0, mul = 1n; i < bits; ++i)
		{
			result += (mul * (Math.random.bool(_crypto) ? 1n : 0n));
			mul *= 2n;
		}

		return result;
	}

	Math.random.byte = function(_max = 255, _min = 0, _crypto = Math.crypto, _max_inclusive = true)
	{
		_max %= 256;
		_min %= 256;

		const min = Math._min(_min, _max);
		const max = Math._max(_max, _min);

		if(min === max)
		{
			return min;
		}

		return Math.random.int(max, min, _crypto, _max_inclusive);
	}

	Math.random.char = function(_max = 255, _min = 0, _crypto = Math.crypto, _max_inclusive = true)
	{
		return String.fromCodePoint(Math.random.byte(_max, _min, _crypto, _max_inclusive));
	}

	Math.random.numeric = function(_radix = 10, _count = -16, _count_min = 1, _crypto = Math.crypto)
	{
		return Math.random.alphabet(_radix, _count, _count_min, false, _crypto);
	}

	Math.random.radix = function(_radix, _count = -16, _count_min = 1, _crypto = Math.crypto)
	{
		return Math.random.alphabet(_radix, _count, _count_min, false, _crypto);
	}

	Math.random.alphabet = function(_alphabet, _count = -16, _count_min = 1, _crypto = Math.crypto)
	{
		if(! isRadix(_alphabet))
		{
			return x('Invalid argument (expecting a % % or % %)', null, 'radix', 'Integer', 'alphabet', 'String');
		}
		else
		{
			_alphabet = alphabet(_alphabet, true, true, false);
		}

		if(typeof _count_min < 1)
		{
			_count_min = 1;
		}

		if(! isInt(_count))
		{
			_count = -16;
		}

		if(_count < 0)
		{
			_count = Math.random.int(Math.abs(_count), _count_min, _crypto, true);
		}

		var result = '';

		while(result.length < _count)
		{
			result += _alphabet.getRandom(1, null, _crypto);
		}

		return result;
	}

	Math.random.upper = function(_count = -16, _count_min = 1, _crypto = Math.crypto)
	{
		if(_count < 0)
		{
			_count = Math.random.int(Math.abs(_count), _count_min, _crypto, true);
		}

		var result = '';

		while(result.length < _count)
		{
			result += alphabet.UPPER.getRandom(1, null, _crypto);
		}

		return result;
	}

	Math.random.lower = function(_count = -16, _count_min = 1, _crypto = Math.crypto)
	{
		if(_count < 0)
		{
			_count = Math.random.int(Math.abs(_count), _count_min, _crypto, true);
		}

		var result = '';

		while(result.length < _count)
		{
			result += alphabet.LOWER.getRandom(1, null, _crypto);
		}

		return result;
	}

	Math.random.letters = function(_count = -16, _count_min = 1, _crypto = Math.crypto)
	{
		if(_count < 0)
		{
			_count = Math.random.int(Math.abs(_count), _count_min, _crypto, true);
		}

		var result = '';

		while(result.length < _count)
		{
			result += alphabet.LETTER.getRandom(1, null, _crypto);
		}

		return result;
	}

	Math.random.word = function(_length = -14, _min = 2, _chance = 0.20, _crypto = Math.crypto)
	{
		if(! isInt(_length))
		{
			return x('Invalid _length (expecint a positive or negative Integer)');
		}
		else if(! isInt(_min))
		{
			_min = 2;
		}
		else if(! isNumber(_chance))
		{
			_chance = 0.20;
		}
		else
		{
			if(_chance < 0)
			{
				_chance = 0;
			}
			else if(_chance > 1)
			{
				_chance = 1;
			}
		}

		if(_length < 0)
		{
			_length = Math.random.int(Math.abs(_length), _min, _crypto, true);
		}

		var result = (Math.random(_crypto) < _chance ? alphabet.UPPER.getRandom(1, null, _crypto) : alphabet.LOWER.getRandom(1, null, _crypto));

		while(result.length < _length)
		{
			result += alphabet.LOWER.getRandom(1, null, _crypto);
		}

		return result;
	}

	Math.random.sentence = function(_length = 80, _min_length = 16, _word_length = -12, _word_min_length = 3, _chance_upper_case = 0.20, _crypto = Math.crypto)
	{
		if(isNumber(_length))
		{
			if((_length = Math.int(_length)) < 0)
			{
				if(! isInt(_min_length))
				{
					_min_length = 16;
				}

				_length = Math.random.int(Math.abs(_length), _min_length, _crypto, true);
			}
		}
		else
		{
			return x('Invalid _length (expecting positive or negative Integer)');
		}

		var result = alphabet.UPPER.getRandom(1, null, _crypto);

		while(result.length < _length)
		{
			result += Math.random.word(_word_length, _word_min_length, _chance_upper_case, _crypto) + ' ';
		}

		return (result.removeLast().substr(0, _length - 1).removeEnding(' ') + '.');
	}

	Math.random.text = function(_rows = -console.height, _columns = -console.width, _rows_min = 1, _columns_min = 25, _sentence_length = -60, _sentence_min_length = 16, _word_length = -12, _word_min_length = 3, _chance_upper_case = 0.20, _chance_newline = 0.2, _crypto = Math.crypto)
	{
		if(isNumber(_rows))
		{
			if((_rows = Math.int(_rows)) < 0)
			{
				if(! isInt(_rows_min))
				{
					_rows_min = 1;
				}

				_rows = Math.random.int(Math.abs(_rows), _rows_min, _crypto, true);
			}
		}
		else
		{
			_rows = 1;
		}

		if(isNumber(_columns))
		{
			if((_columns = Math.int(_columns)) < 0)
			{
				if(! isInt(_columns_min))
				{
					_columns_min = 25;
				}
			}
		}
		else
		{
			_columns = console.size.width;
		}

		const getColumnCount = () => {
			if(_columns < 0)
			{
				return Math.random.int(Math.abs(_columns), _columns_min, _crypto, true);
			}

			return _columns;
		};

		const lines = new Array(_rows);

		for(var i = 0; i < lines.length; ++i)
		{
			const cols = getColumnCount();
			lines[i] = '';

			while(lines[i].length < cols)
			{
				lines[i] += Math.random.sentence(_sentence_length, _sentence_min_length, _word_length, _word_min_length, _chance_upper_case, _crypto) + ' ';
			}

			lines[i] = lines[i].substr(0, cols).removeEnding(' ');
		}

		var result;

		if(_chance_newline === 0)
		{
			result = lines;
		}
		else
		{
			result = [];

			for(var i = 0, j = 0; i < lines.length; ++i, ++j)
			{
				result[j] = lines[i];

				if(Math.random(_crypto) < _chance_newline)
				{
					result[j] = result[j].removeEnding(' ', '.').removeLast() + '.';
					result[++j] = '';
				}
			}
		}

		return result.join(EOL).removeLast().removeEnding(' ').removeEnding('.') + '.';
	}

	Math.random.text.pure = Math.random.pure = function(_rows = -console.height, _columns = -console.width, _rows_min = 1, _columns_min = 25, _sentence_length = -60, _sentence_min_length = 16, _word_length = -12, _word_min_length = 3, _chance_upper_case = 0.20, _crypto = Math.crypto)
	{
		return Math.random.text(_rows, _columns, _rows_min, _columns_min, _sentence_length, _sentence_min_length, _word_length, _word_min_length, _chance_upper_case, 0, _crypto);
	}

	//
	const ceil = Math.ceil;
	const floor = Math.floor;
	const round = Math.round;

	Object.defineProperty(Math, 'ceil', { value: function(_number, _precision = 0)
	{
		if(typeof _number === 'bigint')
		{
			return _number;
		}
		else if(! isInt(_precision))
		{
			_precision = 0;
		}

		const coefficient = Math.pow(10, Math.abs(_precision));
		return (ceil(_number * coefficient) / coefficient);
	}});

	Object.defineProperty(Math, 'floor', { value: function(_number, _precision = 0)
	{
		if(typeof _number === 'bigint')
		{
			return _number;
		}
		else if(! isInt(_precision))
		{
			_precision = 0;
		}

		const coefficient = Math.pow(10, Math.abs(_precision));
		return (floor(_number * coefficient) / coefficient);
	}});

	Object.defineProperty(Math, 'round', { value: function(_number, _precision = 0)
	{
		if(typeof _number === 'bigint')
		{
			return _number;
		}
		else if(! isInt(_precision))
		{
			_precision = 0;
		}

		const coefficient = Math.pow(10, Math.abs(_precision));
		return (round(_number * coefficient) / coefficient);
	}});

	Object.defineProperty(Math, 'int', { value: function(_number, _precision = 0, _inverse = false)
	{
		if(typeof _number === 'bigint')
		{
			return _number;
		}
		else if(! Number.isNumber(_number))
		{
			return x('Invalid % argument (not a %)', null, '_number', 'Number');
		}

		if(! Number.isInt(_precision))
		{
			_precision = 0;
		}

		if(typeof _inverse !== 'boolean')
		{
			_inverse = false;
		}

		const a = (_number < 0);
		const b = (_inverse);

		return ((((a&&b)||!(a||b)) ? Math.floor : Math.ceil)
			(_number, _precision));
	}});

	Object.defineProperty(Math, 'iint', { value: function(_number, _precision = 0)
	{
		return Math.int(_number, _precision, true);
	}});

	//
	function bigIntLogBase(_base, _value)
	{
		var result = 0;
		var rest = _value;

		while(rest >= _base)
		{
			rest /= _base;
			++result;
		}

		return result;
	}

	Object.defineProperty(Math, 'logBase', { value: function(_base, _value)
	{
		if(! isNumeric(_base))
		{
			return x('Invalid % argument (not a % or %)', null, '_base', 'Number', 'BigInt');
		}

		if(typeof _value === 'bigint')
		{
			return bigIntLogBase(BigInt.from(_base), _value);
		}
		else if(isNumber(_value))
		{
			_base = Number(_base);
		}
		else
		{
			return x('The % argument needs to be a % or %', null, '_value', 'Number', 'BigInt');
		}

		return (Math.log(_value) / Math.log(_base));
	}});

	Object.defineProperty(Math, 'fraction', { value: function(_float, _radix = 10, _tolerance = 1.0E-6)
	{
		//
		if(! isNumber(_float))
		{
			throw new Error('Invalid _float argument (not a Number)');
		}
		else if(_float < 0)
		{
			return ('-' + Math.fraction(-_float, _radix, _tolerance));
		}
		else if(_float.isInt)
		{
			return (_float.toString(_radix) + '/1');
		}

		//
		if(typeof _tolerance !== 'number')
		{
			_tolerance = 1.0E-6;
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
	}});

	//
	Object.defineProperty(Math, 'time', { value: function(_value, _int = false, _absolute = true, _relative = true)
	{
		var bigint;

		if(typeof _value === 'bigint')
		{
			_value = Math.abs(_value);
			bigint = true;
		}
		else if(Number.isNumber(_value))
		{
			_value = Math.floor(Math.abs(_value));
			bigint = false;
		}
		else
		{
			return x('Expecting % (% or %)', null, 'milliseconds', 'Number', 'BigInt');
		}

		//
		const result = Object.null({ value: _value });
		const units = Math.time.UNIT;

		//
		const relative = (_rest = _value) => {
			const big = (typeof _rest === 'bigint');
			const res = Object.create(null);
			const int = (!big && _int);
			var base = (big ? 1n : 1);
			var value = _rest;
			var name;

			for(var i = 0; i < units.length; i++)
			{
				_rest /= base;
				[ name, base ] = units[i];
				if(big) base = BigInt.from(base);
				value = (base === (big ? 1n : 1) ? _rest : (_rest % base));
				res[name] = result[name] = (int ? Math.int(value) : value);
			}

			return res;
		};

		const absolute = (_rest = _value) => {
			const big = (typeof _rest === 'bigint');
			const res = Object.create(null);
			const int = (!big && _int);
			var value, name, base;

			for(var i = 0, mul = (big ? 1n : 1); i < units.length; i++)
			{
				[ name, base ] = units[i];
				value = (_rest / mul);
				res[name + 's'] = result[name + 's'] = (int ? Math.int(value) : value);
				mul *= (big ? BigInt.from(base) : base);
			}

			return res;
		};

		//
		if(_absolute)
		{
			result.absolute = absolute();
		}

		if(_relative)
		{
			result.relative = relative();
		}

		//
		Object.defineProperty(result, 'toObject', { value: function(_round = 0)
		{
			delete result.value;
			delete result.absolute;
			delete result.relative;

			if(isInt(_round)) for(var idx in result)
			{
				if(! isNumber(result[idx]))
				{
					continue;
				}
				else if(_round === 0)
				{
					result[idx] = Math.int(result[idx]);
				}
				else
				{
					result[idx] = Math.round(result[idx], _round);
				}
			}

			return result;
		}});

		//TODO/..!!
		//Object.defineProperty(result, 'toText', { value: function(_..
		//Object.defineProperty(result, 'toString', { value: function(_...

		//
		return result;
	}});

	//
	time = Math.time;

	//
	Math.time.UNIT = [
		// nanoseconds?? 1000000???
		[ 'millisecond', 1000 ],
		[ 'second', 60 ],
		[ 'minute', 60 ],
		[ 'hour', 24 ],
		[ 'day', 7 ],
		[ 'week', 4 ],
		[ 'month', 12 ],
		[ 'year', 1 ]
	];

	Object.defineProperty(Math.time, 'unit', { get: function()
	{
		return Math.time.UNIT.select(0);
	}});

	Object.defineProperty(Math.time, 'short', { get: function()
	{
		return [ 'ms', 'sec', 'm', 'h', 'd', 'w', 'mon', 'y' ];
	}});

	(function()
	{
		var MUL = 1;

		for(var i = 0; i < Math.time.UNIT.length; i++)
		{
			const [ name, base ] = Math.time.UNIT[i];
			const mul = Math.time.UNIT[i][2] = MUL;

			Object.defineProperty(Math.time, (name + 's'), { value: function(_value)
			{
				if(! isNumber(_value))
				{
					return x('Expecting a % for the \'%\' (%)', null, name, mul);
				}

				return (mul * _value);
			}});

			MUL *= base;
		}
	})();

	Math.time.absolute = function(_value, _int = true)
	{
		return Math.time(_value, _int, true, false);
	}

	Math.time.relative = function(_value, _int = true)
	{
		return Math.time(_value, _int, false, true);
	}

	Math.time.from = function(_object)
	{
		if(! Object.isObject(_object))
		{
			return x('Invalid _object');
		}

		const keys = Object.keys(_object, false, false);
		const values = {};

		for(var i = 0; i < keys.length; i++)
		{
			if(keys[i].last() === 's')
			{
				keys[i] = keys[i].removeLast();
				values[keys[i]] = _object[keys[i] + 's'];
			}
			else
			{
				values[keys[i]] = _object[keys[i]];
			}
		}

		var result = 0;

		for(var i = 0; i < keys.length; i++)
		{
			if(! ((keys[i] + 's') in Math.time))
			{
				continue;
			}

			result += Math.time[keys[i] + 's'](values[keys[i]]);
		}

		return result;
	}

	Math.time.render = function(_value, _colors = false, _sep = ' ', _space = true, _short = false)
	{
		if(! isNumeric(_value))
		{
			return x('Invalid % argument (expecting a % or %)', null, '_value', 'Number', 'BigInt');
		}
		else if(typeof _short !== 'boolean')
		{
			return x('Invalid % argument (expecting a %)', null, '_short', 'Boolean');
		}
		else if(! _short)
		{
			_space = false;
		}

		if(typeof _sep !== 'string')
		{
			_sep = ' ';
		}

		if(typeof _colors !== 'boolean')
		{
			_colors = COLORS;
		}

		if(typeof _space !== 'boolean')
		{
			_space = _short;
		}

		const color = (_item, _as = null) => {
			if(! _colors)
			{
				return (typeof _item === 'string' ? _item : _item.toText());
			}
			else if(String.isString(_as) && typeof _item === 'string')
			{
				return _item.colorizeAs(_as);
			}
			else if(typeof _item === 'string')
			{
				if(DEFAULT_TIME_RENDER_STRING_COLORS)
				{
					return _item.colorizeAs('String');
				}

				return _item;
			}

			return _item.toText().colorizeAs(typeof _item === 'bigint' ? 'BigInt' : 'Number');
		};

		const shorts = (_short ? Math.time.short.reverse() : null);
		const units = Math.time.unit.reverse();
		const relative = Math.time(_value, true, false, true);

		var result = '';

		for(var i = 0; i < units.length; ++i)
		{
			if(relative[units[i]] < 1)
			{
				continue;
			}
			else if(shorts)
			{
				result += color(relative[units[i]], 'Number') + (_space ? ' ' : '') + color(shorts[i]);
			}
			else
			{
				result += color(relative[units[i]], 'Number') + ' ' + color(units[i] + (relative[units[i]].int === 1 ? '' : 's'));
			}

			result += _sep;
		}

		return result.removeLast(_sep.length);
	}

	Math.time.render.short = function(_value, _colors = false, _sep = (_colors ? ' ' : ', '), _space = false)
	{
		return Math.time.render(_value, _colors, _sep, _space, true);
	}

	//
	const SIZE = Object.create(null);
	SIZE['1000'] = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
	SIZE['1024'] = [ 'B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB' ];
	SIZE[''] = [ 'B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y' ];

	const SIZE_RELATIVE_REST = false;
	const SIZE_ABSOLUTE_REST = true;

	Object.defineProperty(Math, 'size', { value: function(_size, _int = false, _base, _absolute = true, _relative = true, _relative_float = true)
	{
		if(typeof _size === 'string')
		{
			if(_size.length === 0)
			{
				return 0;
			}
			else if(! isInt(_size = Math.size.parse(_size)))
			{
				return x('Invalid _size');
			}
		}
		else if(! (isInt(_size) || typeof _size === 'bigint'))
		{
			return x('Expecting String, Integer or BigInt as _size');
		}
		else if(_size < 0)
		{
			return x('Negative sizes are not possible ' + 'here'.bold);
		}

		if(isNumber(_base))
		{
			_base = [ _base ];
		}
		else if(Array.isArray(_base))
		{
			for(var i = 0; i < _base.length; i++)
			{
				if(! isNumber(_base[i]))
				{
					_base.splice(i--, 1);
				}
			}

			if(_base.length === 0)
			{
				_base = Math.size.base;
			}
		}
		else
		{
			_base = Math.size.base;
		}

		const rendered = Math.size.render(_size);
		const result = Object.null({
			base: _base.clone(),
			length: _size,
			text: rendered.toText(false),
			string: rendered.toString(false),
			colorText: rendered.toText(true),
			colorString: rendered.toString(true),
			findUnit: Math.size.findUnit
		});

		if(_absolute)
		{
			result.absolute = Object.create(null);
		}

		if(_relative)
		{
			result.relative = Object.create(null);
		}

		const unit = Math.size.unit;
		const getKey = (_base, _index) => {
			if((_base in unit) && (_index < unit[_base].length))
			{
				return unit[_base][_index];
			}

			return _base;
		};
		const keys = (_base) => {
			if(_base in unit)
			{
				return unit[_base].length;
			}

			return 0;
		};

		const relative = (_rest = _size, _base) => {
			const big = (typeof _rest === 'bigint');
			const base = (big ? BigInt.from(_base) : _base);
			const res = Object.create(null);
			const int = ((!big && _int) || !!big);
			var key, had = false;
			var value, index = 0;

			do
			{
				value = (_base === 1 ? _rest : (_rest % base));
				if(typeof (key = getKey(_base, index)) === 'string')
				{
					had = true;
				}
				res[key] = (int ? Math.round(value) : value);
				index++;
				_rest /= base;
			}
			while(_rest >= (big ? 1n : 1));

			if(SIZE_RELATIVE_REST && had && _relative_float && !int)
			{
				const len = keys(_base);

				for(; index < len; index++)
				{
					value = (_base === 1 ? _rest : (_rest % base));
					res[getKey(_base, index)] = (int ? Math.round(value) : value);
					_rest /= base;
				}
			}

			return result.relative[_base] = res;
		};

		const absolute = (_rest = _size, _base) => {
			const big = (typeof _rest === 'bigint');
			const base = (big ? BigInt.from(_base) : _base);
			const res = Object.create(null);
			const int = ((!big && _int) || !!big);
			var mul = (big ? 1n : 1);
			var key, had = false;
			var value = _rest;
			var index = 0;

			do
			{
				if(typeof (key = getKey(_base, index)) === 'string')
				{
					had = true;
				}
				res[key] = (int ? Math.int(value) : value);
				index++;
				mul *= base;
				value = (_rest / mul);
			}
			while(value >= (big ? 1n : 1));

			if(SIZE_ABSOLUTE_REST && had && !int)
			{
				const len = keys(_base);

				for(index, mul *= base; index < len; index++)
				{
					res[getKey(_base, index)] = (int ? Math.int(value) : value);
					value = (_rest / mul);
					mul *= base;
				}
			}

			return result.absolute[_base] = res;
		};

		if(_absolute) for(var i = 0; i < _base.length; i++)
		{
			absolute(_size, _base[i]);
		}

		if(_relative) for(var i = 0; i < _base.length; i++)
		{
			relative(_size, _base[i]);
		}

		if(_relative && !_absolute)
		{
			Object.prototype.assign.call(result, result.relative);

			for(const b in result.relative)
			{
				for(const i in result.relative[b])
				{
					result[i] = result.relative[b][i];
				}
			}
		}
		else if(_absolute && !_relative)
		{
			Object.prototype.assign.call(result, result.absolute);

			for(const b in result.absolute)
			{
				for(const i in result.absolute[b])
				{
					result[i] = result.absolute[b][i];
				}
			}
		}

		return result;
	}});

	//
	size = Math.size;

	//
	Math.size.absolute = function(_size, _int = true, _base)
	{
		return Math.size(_size, _int, _base, true, false);
	}

	Math.size.relative = function(_size, _int = true, _base, _relative_float = false)
	{
		return Math.size(_size, _int, _base, false, true, _relative_float);
	}

	const DEFAULT_BASES = [ 1024, 1000 ];
	var BASES = [ 1024, 1000 ];

	Object.defineProperty(Math.size, 'base', {
		get: function()
		{
			return BASES;
		},
		set: function(_value)
		{
			if(Array.isArray(_value, true))
			{
				const value = [];

				for(var i = 0, j = 0; i < _value.length; i++)
				{
					if(isNumber(_value[i]))
					{
						value[j++] = _value[i];
					}
				}

				if(value.length > 0)
				{
					return BASES = value;
				}

				return BASES = DEFAULT_BASES;
			}
			else if(isNumber(_value))
			{
				return BASES = [ _value ];
			}

			return BASES = DEFAULT_BASES;
		}
	});

	Object.defineProperty(Math.size, 'unit', { get: function()
	{
		const result = Object.create(null);

		for(var idx in SIZE)
		{
			result[idx] = new Array(SIZE[idx].length);

			for(var i = 0; i < SIZE[idx].length; i++)
			{
				result[idx][i] = SIZE[idx][i];
			}
		}

		return result;
	}});

	function getSizes(_unit, _base_default = BASE)
	{
		//
		var unit = Math.size.findUnit(_unit);
		var base = null;
		var index = null;

		//
		if(unit === 'B')
		{
			base = (typeof _base_default === 'number' ? _base_default : BASE);
			index = 0;
		}
		else
		{
			var stop = false;

			for(var b in Math.size.unit)
			{
				for(var i = 1; i < Math.size.unit[b].length; i++)
				{
					if(Math.size.unit[b][i] === unit)
					{
						if(b === '')
						{
							base = null;
						}
						else
						{
							base = parseInt(b);
						}

						index = i;
						stop = true;
						break;
					}
				}

				if(stop)
				{
					break;
				}
			}
		}

		//
		return [ unit, base, index ];
	}

	Object.defineProperty(Math.size, 'parse', { value: function(_value, _unit = null, _base = BASE, _bigint = false, _throw = true)
	{
		if(Object.isObject(_value))
		{
			if(typeof _value.unit === 'string')
			{
				_unit = _value.unit;
			}

			if(typeof _value.base === 'number')
			{
				_base = _value.base;
			}

			if(typeof _value.bigint === 'boolean')
			{
				_bigint = _value.bigint;
			}

			if(typeof _value.throw === 'boolean')
			{
				_throw = _value.throw;
			}

			_value = _value.value;
		}

		if(typeof _value === 'number' || typeof _value === 'bigint')
		{
			_value = _value.toString();
		}
		else if(typeof _value === 'string')
		{
			if(_value.length === 0)
			{
				return (_bigint ? 0n : 0);
			}
			else if(_value.isInt())
			{
				return _value.parseInt();
			}
		}
		else
		{
			return x('Invalid _value (needs to be a String)');
		}

		if(typeof _unit === 'string')
		{
			_unit = Math.size.findUnit(_unit);
		}
		else
		{
			_unit = null;
		}

		if(typeof _base !== 'number')
		{
			_base = BASE;
		}

		if(typeof _bigint !== 'boolean')
		{
			_bigint = false;
		}

		if(typeof _throw !== 'boolean')
		{
			_throw = true;
		}

		//
		//if((_value = fromText(_value.less)).length === 0)//TODO/
		if(_value.length === 0)
		{
			return 0;
		}

		//
		var value = '';
		var unit = (_unit === null ? '' : _unit);
		var unitStarted = false;

		for(var i = 0; i < _value.length; i++)
		{
			if(_value[i] === ' ' || _value[i] === '\t')
			{
				continue;
			}
			else if(_value[i] === '.')
			{
				if(! unitStarted)
				{
					value += '.';
				}
			}
			else if(unitStarted)
			{
				if(_unit !== null)
				{
					continue;
				}

				if(alphabet.letter(_value[i]))
				{
					unit += _value[i];
				}
			}
			else if(_value[i].isInt())
			{
				value += _value[i];
			}
			else if(alphabet.letter(_value[i]))
			{
				if(_unit !== null)
				{
					break;
				}

				unit += _value[i];
				unitStarted = true;
			}
		}

		if(value.length === 0)
		{
			return (_bigint ? 0n : 0);
		}
		else if(_bigint)
		{
			value = parseBigInt(value);
		}
		else
		{
			value = parseFloat(value);
		}

		var base, index;
		[ unit, base, index ] = getSizes(unit, _base);

		if(index === 0)
		{
			return value;
		}

		//
		var result = value;

		if(_bigint)
		{
			base = BigInt.from(base);
		}

		for(var i = 0; i < index; i++)
		{
			result *= base;
		}

		return result;
	}});

	Object.defineProperty(Math.size, 'render', { value: function(_value, _unit = null, _precision, _pad, _base = BASE, _radix = null, _long = true, _throw = true)
	{
		//
		if(Object.isObject(_value))
		{
			if('precision' in _value)
			{
				_precision = _value.precision;
			}

			if(typeof _value.pad === 'boolean')
			{
				_pad = _value.pad;
			}

			if(typeof _value.base === 'number')
			{
				_base = _value.base;
			}

			if('radix' in _value)
			{
				_radix = _value.radix;
			}

			if(typeof _value.long === 'boolean')
			{
				_long = _value.long;
			}

			if(typeof _value.throw === 'boolean')
			{
				_throw = _value.throw;
			}

			_unit = _value.unit;
			_value = _value.value;
		}

		//
		const withUnit = (typeof _unit === 'string' && _unit.length > 0);

		//
		if(Object.isObject(_precision))
		{
			if(!(isInt(_precision.min) && _precision.min >= 0))
			{
				_precision.min = null;
			}

			if(!(isInt(_precision.max) && _precision.max >= 0))
			{
				_precision.max = null;
			}

			if(_precision.min === null && _precision.max === null)
			{
				_precision = null;
			}
		}
		else if(!(isInt(_precision) && _precision >= 0))
		{
			_precision = null;
		}

		if(typeof _pad !== 'boolean')
		{
			_pad = false;
		}

		if(typeof _base !== 'number')
		{
			_base = BASE;
		}

		if(! isRadix(_radix))
		{
			_radix = 10;
		}

		if(typeof _long !== 'boolean')
		{
			_long = true;
		}

		if(typeof _throw !== 'boolean')
		{
			_throw = true;
		}

		if(typeof _value === 'string')
		{
			_value = Math.size.parse(_value, _base, _throw);
		}
		else if(typeof _value === 'bigint')
		{
			_value = Number(_value);
		}
		else if(typeof _value !== 'number')
		{
			return x('Invalid _value (expecting Number or BigInt)');
		}
		else
		{
			_unit = Math.size.findUnit(_unit, _throw);
		}

		//
		var value = _value;

		if(typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'bigint')
		{
			if(_throw)
			{
				return x('Invalid _value');
			}

			return null;
		}
		else if(typeof _value === 'string' && _value.length === 0)
		{
			return (0 + (withUnit ? 0 : (_long ? ' Bytes' : ' B')));
		}

		if(withUnit)
		{
			const [ unit, base, index ] = getSizes(_unit);

			for(var i = 0; i < index; i++)
			{
				value /= base;
			}

			//
			if(isInt(_precision))
			{
				value = Math.round(value, _precision);
			}
			else if(Object.isObject(_precision))
			{
				if(_precision.max !== null)
				{
					value = Math.round(value, _precision.max);
				}
				else if(_precision.min !== null)
				{
					value = Math.round(value, _precision.min);
				}
			}

			//
			return value;
		}

		const units = ((_base in Math.size.unit) ? Math.size.unit[_base] : Math.size.unit['']);
		var index = 0;

		if(value >= _base)
		{
			while(index < (units.length - 1) && (value /= _base) >= _base)
			{
				index++;
			}

			if(index < (units.length - 1))
			{
				index++;
			}
		}

		//
		const result = [ value, units[index] ];

		if(isInt(_precision))
		{
			result[0] = Math.round(result[0], _precision);
		}
		else if(Object.isObject(_precision))
		{
			if(_precision.max !== null)
			{
				result[0] = Math.round(result[0], _precision.max);
			}
			else if(_precision.min !== null)
			{
				result[0] = Math.round(result[0], _precision.min);
			}
		}

		if(_long && index === 0)
		{
			result[1] += 'yte';

			if(result[0] !== 1)
			{
				result[1] += 's';
			}
		}

		result[2] = _value;
		result[3] = index;

		//
		Object.defineProperty(result, 'toString', { value: function(_opts, _toText = false)
		{
			if(typeof _toText !== 'boolean')
			{
				_toText = false;
			}

			const opts = {};

			if(Object.isObject(_opts))
			{
				opts.merge(_opts);
			}
			else if(typeof _opts === 'boolean')
			{
				opts.colors = _opts;
			}
			else if(typeof _opts === 'object' || (isInt(_opts) && _opts >= 0))
			{
				opts.precision = _opts;
			}
			else if(typeof _opts === 'string' && _opts.length > 0)
			{
				opts.language = _opts;
			}

			if(typeof opts.locale !== 'boolean')
			{
				opts.locale = true;
			}

			if(! isRadix(opts.radix))
			{
				opts.radix = 10;
			}

			if(typeof opts.colors !== 'boolean')
			{
				opts.colors = false;
			}

			if(opts.precision !== null && !(isInt(opts.precision) && opts.precision >= 0))
			{
				opts.precision = _precision;
			}

			if(typeof opts.pad !== 'boolean')
			{
				opts.pad = _pad;
			}

			if(typeof opts.round !== 'boolean')
			{
				opts.round = true;
			}

			if(isInt(opts.space))
			{
				opts.space = String.repeat(opts.space, ' ');
			}
			else if(typeof opts.space !== 'string')
			{
				opts.space = ' ';
			}

			if(typeof opts.language !== 'string' || opts.language.length === 0)
			{
				if(typeof opts.lang === 'string' && opts.lang.length > 0)
				{
					opts.language = opts.lang;
					delete opts.lang;
				}
				else
				{
					opts.language = LANGUAGE;
				}
			}

			var value = result[0];
			var unit = result[1];

			if(Object.isObject(opts.precision))
			{
				if(opts.precision.max !== null)
				{
					value = Math.round(value, opts.precision.max);
				}
				else if(opts.precision.min !== null)
				{
					value = Math.round(value, opts.precision.min);
				}
			}
			else if(opts.precision !== null)
			{
				value = Math.round(value, opts.precision);
			}

			if(_toText)
			{
				value = value.toText(opts.precision, opts.language);
			}
			else if(opts.radix === 10)
			{
				if(opts.locale)
				{
					value = value.toText(opts.precision, opts.language);
				}
				else
				{
					value = value.toString();
				}
			}
			else if(opts.locale)
			{
				const opts = {};

				if(opts.precision !== null)
				{
					if(typeof opts.precision === 'number')
					{
						opts.minimumFractionDigits = opts.precision;
						opts.maximumFractionDigits = opts.precision;
					}
					else
					{
						opts.assign(opts.precision);
					}
				}

				value = value.toLocaleString(LANGUAGE, opts);
			}
			else
			{
				value = value.toString(opts.radix);
			}

			if(opts.colors)
			{
				value = value.colorizeAs('Number');
				unit = unit.colorizeAs('String');
			}

			return (value + opts.space + unit);
		}});

		Object.defineProperty(result, 'toText', { value: function(_opts)
		{
			return this.toString(_opts, true);
		}});

		//
		return result;
	}});

	Object.defineProperty(Math.size, 'findUnit', { value: function(_unit, _throw = true)
	{
		var result;

		if(typeof _unit === 'string')
		{
			switch(_unit = _unit.toLowerCase())
			{
				case '':
				case 'b':
				case 'byte':
				case 'bytes':
					result = 'B';
					break;
				case 'k':
				case 'kb':
					result = 'KB';
					break;
				case 'ki':
				case 'kib':
					result = 'KiB';
					break;
				case 'm':
				case 'mb':
					result = 'MB';
					break;
				case 'mi':
				case 'mib':
					result = 'MiB';
					break;
				case 'g':
				case 'gb':
					result = 'GB';
					break;
				case 'gi':
				case 'gib':
					result = 'GiB';
					break;
				case 't':
				case 'tb':
					result = 'TB';
					break;
				case 'ti':
				case 'tib':
					result = 'TiB';
					break;
				case 'p':
				case 'pb':
					result = 'PB';
					break;
				case 'pi':
				case 'pib':
					result = 'PiB';
					break;
				case 'e':
				case 'eb':
					result = 'EB';
					break;
				case 'ei':
				case 'eib':
					result = 'EiB';
					break;
				case 'z':
				case 'zb':
					result = 'ZB';
					break;
				case 'zi':
				case 'zib':
					result = 'ZiB';
					break;
				case 'y':
				case 'yb':
					result = 'YB';
					break;
				case 'yi':
				case 'yib':
					result = 'YiB';
					break;
				default:
					if(_throw)
					{
						return x('Invalid target _unit ~[ b, k, m, g, t, p, e, z, y ]');
					}

					result = 'B';
					break;
			}
		}
		else
		{
			result = 'B';
		}

		return result;
	}});

	//
	const _abs = Math.abs;

	Object.defineProperty(Math, 'abs', { value: function(_value)
	{
		if(typeof _value === 'number')
		{
			return _abs.call(_value, _value);
		}
		else if(typeof _value !== 'bigint')
		{
			throw new Error("TEST @ " +_value+' (' + typeOf(_value) + ')');//zzzzzzzzzzzzzzzzzzzzTODO
			return x('Invalid _value (expecting Number or BigInt)');
		}

		if(_value < 0n)
		{
			if((_value = -_value) === 0n)
			{
				return 0n;
			}
			else
			{
				return _value;
			}
		}
		else if(_value === 0n)
		{
			return 0n;
		}

		return _value;
	}});

	//
	Object.defineProperty(Math, 'distance', { value: function(... _args)
	{
		//
		var max = 0;
		var keys = [];
		const arr = [];

		for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(Array.isArray(_args[i], true))
			{
				if(_args[i].length > max)
				{
					max = _args[i].length;
				}
				
				arr[j++] = _args[i];
			}
		}

		for(var i = 0; i < _args.length; ++i)
		{
			keys[i] = Object.keys(_args[i], false, false);

			if(Array.isArray(_args[i], true))
			{
				if(_args[i].length < max)
				{
					max = _args[i].length;
				}
			}
		}

		keys = Array.intersect(... keys);

		//
		const result = (max === 0 ? {} : []);
		var type, diff;

		for(var i = 0, k = 0; i < max; ++i)
		{
			type = Object.typeOf(arr[arr.length - 1][i]);
			
			if(type !== 'Number' && type !== 'BigInt')
			{
				continue;
			}
			else for(var j = arr.length - 2; j >= 0; --j)
			{
				if(Object.typeOf(arr[j][i]) !== type)
				{
					type = null;
					break;
				}
			}
			
			if(type === null)
			{
				continue;
			}
			else
			{
				diff = arr[arr.length - 1][i];
			}
			
			for(var j = arr.length - 2; j >= 0; --j)
			{
				diff -= arr[j][i];
			}
			
			result[k++] = diff;
		}
		
		for(var i = 0; i < keys.length; ++i)
		{
			type = Object.typeOf(_args[_args.length - 1][keys[i]]);

			if(type !== 'Number' && type !== 'BigInt')
			{
				continue;
			}
			else for(var j = _args.length - 2; j >= 0; --j)
			{
				if(Object.typeOf(_args[j][keys[i]]) !== type)
				{
					type = null;
					break;
				}
			}
			
			if(type === null)
			{
				continue;
			}
			else
			{
				diff = _args[_args.length - 1][keys[i]];
			}
			
			for(var j = _args.length - 2; j >= 0; --j)
			{
				diff -= _args[j][keys[i]];
			}
			
			result[keys[i]] = diff;
		}

		return result;
	}});

	//
	Math.getIndex = getIndex;
	Math.getNegativeIndex = getNegativeIndex;
	Math.getLength = getLength;

	// greatest common divisor (GCD)
	Object.defineProperty(Math, 'gcd', { value: function(_a, _b, _knuth = DEFAULT_KNUTH)
	{
		if(! isNumeric(_a))
		{
			return x('Invalid % argument (not a % nor %)', null, '_a', 'Number', 'BigInt');
		}
		else if(! isNumeric(_b))
		{
			return x('Invalid % argument (not a % nor %)', null, '_b', 'Number', 'BigInt');
		}
		else if(typeof _a !== typeof _b)
		{
			return x('Invalid % and % arguments (not the same types)', null, '_a', '_b');
		}
		else if(typeof _knuth !== 'boolean')
		{
			_knuth = DEFAULT_KNUTH;
		}

		//
		if(_knuth)
		{
			return Math.gcd.binary(_a, _b);
		}
		
		return Math.gcd.euclidean(_a, _b);
	}});

	// greatest common divisor (GCD) - iterative function (binary GCD algorithm, also known as Stein's algorithm)	
	Math.gcd.binary = function(_a, _b)
	{
		//
		const bigint = (typeof _a === 'bigint' && typeof _b === 'bigint');
		const zero = (bigint ? 0n : 0);
		const one = (bigint ? 1n : 1);
		
		//
		if(_a === zero)
		{
			return _b;
		}
		else if(_b === zero)
		{
			return _a;
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

		return (_a << shift);
	}
	
	Math.gcd.knuth = Math.gcd.binary;

	// greatest common divisor (GCD) - recursive function (euclidean algorithm)	
	Math.gcd.euclidean = function(_a, _b)
	{
		//
		const bigint = (typeof _a === 'bigint' && typeof _b === 'bigint');
		
		//
		if(_a === (bigint ? 0n : 0))
		{
			return _b;
		}
		else if(_b === (bigint ? 0n : 0))
		{
			return _a;
		}

		return Math.gcd.euclidean(_b, _a % _b);
	}
	
	// least common multiple
	Object.defineProperty(Math, 'lcm', { value: function(_a, _b, _knuth = DEFAULT_KNUTH)
	{
		if(! isNumeric(_a))
		{
			return x('Invalid % argument (not a % nor %)', null, '_a', 'Number', 'BigInt');
		}
		else if(! isNumeric(_b))
		{
			return x('Invalid % argument (not a % nor %)', null, '_b', 'Number', 'BigInt');
		}
		else if(typeof _a !== typeof _b)
		{
			return x('Invalid % / % arguments (not the same type)', null, '_a', '_b');
		}
		else if(typeof _knuth !== 'boolean')
		{
			_knuth = DEFAULT_KNUTH;
		}
		
		const func = (_knuth ? Math.gcd.knuth : Math.gcd.euclidean);
		return ((_a * _b) / func(_a, _b));
	}});
	
	//
	const _max = Math.max.bind(Math);
	const _min = Math.min.bind(Math);
	
	Object.defineProperty(Math, '_max', { value: _max });
	Object.defineProperty(Math, '_min', { value: _min });
	
	Object.defineProperty(Math, 'max', { value: function(... _args)
	{
		if(_args.length === 0)
		{
			return null;
		}
		
		var PATH = null;
		const items = [];
		var real = null;
		var item, value;
		const fromArray = [];

		for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(String.isString(_args[i]) || _args[i] === null)
			{
				if(typeof PATH === 'string' && _args[i] !== null)
				{
					PATH += '.' + _args.splice(i--, 1)[0];
				}
				else
				{
					PATH = _args.splice(i--, 1)[0];
				}
			}
			else if(Array.isArray(_args[i], true))
			{
				for(var k = 0; k < _args[i].length; ++k)
				{
					fromArray[j++] = _args[i][k];
				}
				
				_args.splice(i--, 1);
			}
		}

		_args.concat(fromArray);
		
		if(PATH) for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(Object.has(PATH, _args[i]))
			{
				if(isNumeric(item = Object.get(PATH, _args[i])))
				{
					if(real === null)
					{
						real = Object.get(PATH, _args[i]);
					}
					
					items[j++] = _args[i];
				}
			}
		}
		else for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(isNumeric(_args[i]))
			{
				if(real === null)
				{
					real = _args[i];
				}
				
				items[j++] = _args[i];
			}
		}
		
		if(real === null)
		{
			return x('Invalid or missing arguments');
		}
		else if(items.length < 2)
		{
			return items[0];
		}
		else for(var i = 0; i < items.length; ++i)
		{
			if(PATH)
			{
				item = Object.get(PATH, items[i]);
			}
			else
			{
				item = items[i];
			}
			
			if(typeof item === 'number')
			{
				if(typeof real === 'number')
				{
					if(real < item)
					{
						real = item;
						value = items[i];
					}
				}
				else try
				{
					if(Number.from(real) < item)
					{
						real = item;
						value = items[i];
					}
				}
				catch(_error)
				{
					if(real < BigInt.from(item))
					{
						real = item;
						value = items[i];
					}
				}
			}
			else
			{
				if(typeof real === 'bigint')
				{
					if(real < item)
					{
						real = item;
						value = items[i];
					}
				}
				else try
				{
					if(real < Number.from(item))
					{
						real = item;
						value = items[i];
					}
				}
				catch(_error)
				{
					if(BigInt.from(real) < item)
					{
						real = item;
						value = items[i];
					}
				}
			}
		}
		
		const result = [];
		
		for(var i = 0, j = 0; i < items.length; ++i)
		{
			if(PATH)
			{
				item = Object.get(PATH, items[i]);
			}
			else
			{
				item = items[i];
			}
			
			if(typeof item === 'number')
			{
				if(typeof real === 'number')
				{
					if(item === real)
					{
						result[j++] = items[i];
					}
				}
				else try
				{
					if(Number.from(real) === item)
					{
						result[j++] = items[i];
					}
				}
				catch(_error)
				{
					if(real === BigInt.from(item))
					{
						result[j++] = items[i];
					}
				}
			}
			else
			{
				if(typeof real === 'bigint')
				{
					if(item === real)
					{
						result[j++] = items[i];
					}
				}
				else try
				{
					if(Number.from(item) === real)
					{
						result[j++] = items[i];
					}
				}
				catch(_error)
				{
					if(item === BigInt.from(real))
					{
						result[j++] = items[i];
					}
				}
			}
		}

		//
		if(result.length < 2)
		{
			return result[0];
		}
		
		return result;
	}});
	
	Object.defineProperty(Math, 'min', { value: function(... _args)
	{
		if(_args.length === 0)
		{
			return null;
		}
		
		var PATH = null;
		const items = [];
		var real = null;
		var item, value;
		const fromArray = [];
		
		for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(String.isString(_args[i]) || _args[i] === null)
			{
				if(typeof PATH === 'string' && _args[i] !== null)
				{
					PATH += '.' + _args.splice(i--, 1)[0];
				}
				else
				{
					PATH = _args.splice(i--, 1)[0];
				}
			}
			else if(Array.isArray(_args[i], true))
			{
				for(var k = 0; k < _args[i].length; ++k)
				{
					fromArray[j++] = _args[i][k];
				}

				_args.splice(i--, 1);
			}
		}
		
		_args.concat(fromArray);
		
		if(PATH) for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(Object.has(PATH, _args[i]))
			{
				if(isNumeric(Object.get(PATH, _args[i])))
				{
					if(real === null)
					{
						real = Object.get(PATH, _args[i]);
					}
					
					items[j++] = _args[i];
				}
			}
		}
		else for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(isNumeric(_args[i]))
			{
				if(real === null)
				{
					real = _args[i];
				}
				
				items[j++] = _args[i];
			}
		}

		if(real === null)
		{
			return x('Invalid or missing arguments');
		}
		else if(items.length < 2)
		{
			return items[0];
		}
		else for(var i = 0; i < items.length; ++i)
		{
			if(PATH)
			{
				item = Object.get(PATH, items[i]);
			}
			else
			{
				item = items[i];
			}
			
			if(typeof item === 'number')
			{
				if(typeof real === 'number')
				{
					if(real > item)
					{
						real = item;
						value = items[i];
					}
				}
				else try
				{
					if(Number.from(real) > item)
					{
						real = item;
						value = items[i];
					}
				}
				catch(_error)
				{
					if(real > BigInt.from(item))
					{
						real = item;
						value = items[i];
					}
				}
			}
			else
			{
				if(typeof real === 'bigint')
				{
					if(real > item)
					{
						real = item;
						value = items[i];
					}
				}
				else try
				{
					if(real > Number.from(item))
					{
						real = item;
						value = items[i];
					}
				}
				catch(_error)
				{
					if(BigInt.from(real) > item)
					{
						real = item;
						value = items[i];
					}
				}
			}
		}
		
		const result = [];
		
		for(var i = 0, j = 0; i < items.length; ++i)
		{
			if(PATH)
			{
				item = Object.get(PATH, items[i]);
			}
			else
			{
				item = items[i];
			}

			if(typeof item === 'number')
			{
				if(typeof real === 'number')
				{
					if(item === real)
					{
						result[j++] = items[i];
					}
				}
				else try
				{
					if(Number.from(real) === item)
					{
						result[j++] = items[i];
					}
				}
				catch(_error)
				{
					if(real === BigInt.from(item))
					{
						result[j++] = items[i];
					}
				}
			}
			else
			{
				if(typeof real === 'bigint')
				{
					if(item === real)
					{
						result[j++] = items[i];
					}
				}
				else try
				{
					if(Number.from(item) === real)
					{
						result[j++] = items[i];
					}
				}
				catch(_error)
				{
					if(item === BigInt.from(real))
					{
						result[j++] = items[i];
					}
				}
			}
		}

		//
		if(result.length < 2)
		{
			return result[0];
		}
		
		return result;
	}});
	
	Object.defineProperty(Math, 'longest', { value: function(... _args)
	{
		if(_args.length === 0)
		{
			return null;
		}
		
		var SINGLE = DEFAULT_LONGEST_SHORTEST_SINGLE_LENGTH;
		const items = [];
		var value = null;
		var arr;
		const fromArray = [];

		for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(Array.isArray(_args[i], true))
			{
				for(var k = 0; k < _args[i].length; ++k)
				{
					fromArray[j++] = _args[i][k];
				}
				
				_args.splice(i--, 1);
			}
		}
		
		_args.concat(fromArray);

		for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] === 'boolean' || _args[i] === null)
			{
				SINGLE = _args.splice(i--, 1)[0];
			}
			else if(!DEFAULT_LONGEST_SHORTEST_NUMERIC && (typeof _args[i] === 'number' || typeof _args[i] === 'bigint'))
			{
				continue;
			}
			else try
			{
				if(Number.isInt(_args[i].length) || typeof _args[i].length === 'bigint')
				{
					if(value === null)
					{
						value = _args[i];
					}
					
					items[j++] = _args[i];
				}
			}
			catch(_error)
			{
				continue;
			}
		}
		
		if(value === null)
		{
			return x('Invalid or missing arguments');
		}
		else if(items.length <= 1)
		{
			return value;
		}
		else for(var i = 0; i < items.length; ++i)
		{
			if(typeof items[i].length === 'number')
			{
				if(typeof value.length === 'number')
				{
					if(items[i].length > value.length)
					{
						value = items[i];
					}
				}
				else try
				{
					if(items[i].length > Number.from(value.length))
					{
						value = items[i];
					}
				}
				catch(_error)
				{
					if(BigInt.from(items[i].length) > value.length)
					{
						value = items[i];
					}
				}
			}
			else
			{
				if(typeof value.length === 'bigint')
				{
					if(items[i].length > value.length)
					{
						value = items[i];
					}
				}
				else
				{
					if(Number.from(items[i].length) > value.length)
					{
						value = items[i];
					}
				}
			}
		}

		const result = [];
		
		for(var i = 0, j = 0; i < items.length; ++i)
		{
			if(typeof items[i].length === 'number')
			{
				if(typeof value.length === 'number')
				{
					if(items[i].length === value.length)
					{
						result[j++] = items[i];
					}
				}
				else try
				{
					if(Number.from(value.length) === items[i].length)
					{
						result[j++] = items[i];
					}
				}
				catch(_error)
				{
					if(value.length === BigInt.from(items[i].length))
					{
						result[j++] = items[i];
					}
				}
			}
			else
			{
				if(typeof value.length === 'bigint')
				{
					if(items[i].length === value.length)
					{
						result[j++] = items[i];
					}
				}
				else
				{
					if(value.length === BigInt.from(items[i].length))
					{
						result[j++] = items[i];
					}
				}
			}
		}
		
		if(result.length < 2)
		{
			if(SINGLE !== false)
			{
				return result[0].length;
			}
			
			return result[0];
		}
		else if(SINGLE === true)
		{
			return result[0].length;
		}
		
		return result;
	}});

	Object.defineProperty(Math, 'shortest', { value: function(... _args)
	{
		if(_args.length === 0)
		{
			return null;
		}

		var SINGLE = DEFAULT_LONGEST_SHORTEST_SINGLE_LENGTH;
		const items = [];
		var value = null;
		var arr;
		const fromArray = [];

		for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(Array.isArray(_args[i], true))
			{
				for(var k = 0; k < _args[i].length; ++k)
				{
					fromArray[j++] = _args[i][k];
				}
				
				_args.splice(i--, 1);
			}
		}
		
		_args.concat(fromArray);
		
		for(var i = 0, j = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] === 'boolean' || _args[i] === null)
			{
				SINGLE = _args.splice(i--, 1)[0];
			}
			else if(!DEFAULT_LONGEST_SHORTEST_NUMERIC && (typeof _args[i] === 'number' || typeof _args[i] === 'bigint'))
			{
				continue;
			}
			else try
			{
				if(Number.isInt(_args[i].length) || typeof _args[i].length === 'bigint')
				{
					if(value === null)
					{
						value = _args[i];
					}
					
					items[j++] = _args[i];
				}
			}
			catch(_error)
			{
				continue;
			}
		}

		if(value === null)
		{
			return x('Invalid or missing arguments');
		}
		else if(items.length <= 1)
		{
			return value;
		}
		else for(var i = 0; i < items.length; ++i)
		{
			if(typeof items[i].length === 'number')
			{
				if(typeof value.length === 'number')
				{
					if(items[i].length < value.length)
					{
						value = items[i];
					}
				}
				else try
				{
					if(items[i].length < Number.from(value.length))
					{
						value = items[i];
					}
				}
				catch(_error)
				{
					if(BigInt.from(items[i].length) < value.length)
					{
						value = items[i];
					}
				}
			}
			else
			{
				if(typeof value.length === 'bigint')
				{
					if(items[i].length < value.length)
					{
						value = items[i];
					}
				}
				else
				{
					if(Number.from(items[i].length) < value.length)
					{
						value = items[i];
					}
				}
			}
		}

		const result = [];
		
		for(var i = 0, j = 0; i < items.length; ++i)
		{
			if(typeof items[i].length === 'number')
			{
				if(typeof value.length === 'number')
				{
					if(items[i].length === value.length)
					{
						result[j++] = items[i];
					}
				}
				else try
				{
					if(Number.from(value.length) === items[i].length)
					{
						result[j++] = items[i];
					}
				}
				catch(_error)
				{
					if(value.length === BigInt.from(items[i].length))
					{
						result[j++] = items[i];
					}
				}
			}
			else
			{
				if(typeof value.length === 'bigint')
				{
					if(items[i].length === value.length)
					{
						result[j++] = items[i];
					}
				}
				else
				{
					if(value.length === BigInt.from(items[i].length))
					{
						result[j++] = items[i];
					}
				}
			}
		}
		
		if(result.length < 2)
		{
			if(SINGLE !== false)
			{
				return result[0].length;
			}
			
			return result[0];
		}
		else if(SINGLE === true)
		{
			return result[0].length;
		}

		return result;
	}});

	//
	Math.scale = function(_value, _max, _min)
	{
		if(! isNumber(_value))
		{
			return x('Invalid % argument (not a %)', null, '_value', 'Number');
		}
		else if(! isNumber(_max) || ! isNumber(_min))
		{
			return x('Invalid %/% argument (no %(s))', null, '_max', '_min', 'Number');
		}

		return ((_value * (_max - _min)) + _min);
	}

	//
	Math.px2pt = function(_px)
	{
		if(! isNumber(_px))
		{
			return x('Invalid % argument (not a %)', null, '_px', 'Number');
		}

		return (_px / 0.75);
	}

	Math.pt2px = function(_pt)
	{
		if(! isNumber(_pt))
		{
			return x('Invalid % argument (not a %)', null, '_pt', 'Number');
		}

		return (_pt * 0.75);
	}
	
	//

})();

//
module.exports = Math;

