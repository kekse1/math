/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 * v0.2.9
 */

//
const	// default {options}; // etc...
	RADIX = 10,	// the default... see also "parseCast()"
	INDEX = true,	// siehe "getIndex()"
	ROUND = 0,	// NO rounding at all via (null) or negative values
			// and (0) if you'd like to use byte values, e.g...
	
	//
	THROW = true,
	OVERRIDE = false,
	
	//
	ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
	RADIX_MIN = 2, RADIX_MAX = ALPHABET.length,
	STRING_MAX = 64,

	//
	LOOKUP = (() => {
		const result = new Uint8Array(256).fill(255);
		for(var i = 0; i < ALPHABET.length; ++i)
			result[ALPHABET.charCodeAt(i)] = i;
		return result;
	})();

//
class FloatingArray extends Array
{
	constructor(... _args)
	{
		//
		const options = {};
		
		for(var i = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] === 'object' && _args[i] !== null)
			{
				Object.assign(options, _args.
					splice(i--, 1)[0]);
			}
		}
		
		//
		super(... _args);
		
		//
		this.options = Object.assign({
			index: INDEX,
			radix: RADIX,
			round: ROUND,
			override: OVERRIDE,
			throw: this.constructor.THROW },
				options);

		//
		return this.PROXY = new Proxy(
			this, this.constructor.
				getProxyTraps(
					this));
	}

	static getProxyTraps(_this)
	{
		const result = {};

		result.get = (_target, _property, _receiver) => {
			if(_property.length > STRING_MAX)
			{
				return _target[_property];
			}
			
			if(!_target.override && (_property in _target))
			{
				return _target[_property];
			}

			if(!_target.isNumber(_property, _target.radix, _target.throw))
			{
				return _target[_property];
			}

			if(_target.length === 0)
			{
				return undefined;
			}
			
			_property = _target.parseNumber(
				_property, _target.radix);
			const	negative = (_property < 0);
			var	index = Math.trunc(_property);
			const	float = Math.abs(_property % 1);

			if(_target.index)
			{
				index = this.getIndex(index,
						_target.length);
			}
			else if(index < 0 || index >= _target.length)
			{
				return undefined;
			}

			if(!float)
			{
				return _target[index];
			}
			
			var	next;
			
			if(negative)
			{
				next = (index - 1);
			}
			else
			{
				next = (index + 1);
			}
			
			next = this.getIndex(next, _target.length);

			if(!Number.isFinite(_target[index]) || !Number.isFinite(_target[next]))
			{
				if(_target.throw)
				{
					throw new Error('At least one array element is no finite number');
				}
				
				return _target[index];
			}
			
			return this.round(this.getValue(
					_target[index],
					_target[next],
					float),
				_target.round);
		};

		return result;
	}

	static getValue(_curr, _next, _float)
	{
		return ((_curr + (_next - _curr) * _float) || 0);
	}

	static round(_value, _precision = 0)
	{
		if(_precision < 0 || _precision === null)
		{
			return _value;
		}
		
		const factor = Math.pow(10, _precision);
		return ((Math.round(_value * factor) / factor) || 0);
	}
	
	get round()
	{
		return this.options.round;
	}
	
	set round(_value)
	{
		if(_value < 0 || _value === null)
		{
			return this.options.round = null;
		}
		else if(Number.isFinite(_value))
		{
			if((_value % 1) !== 0)
			{
				if(this.throw)
				{
					throw new Error('Expecting a finite integer value');
				}
				
				return this.options.round;
			}
			
			return this.options.round = _value;
		}
		
		if(this.throw)
		{
			throw new Error('Expecting (null) or a positive, finite integer');
		}
		
		return this.options.round;
	}
	
	get index()
	{
		return this.options.index;
	}
	
	set index(_value)
	{
		if(typeof _value === 'boolean')
		{
			return this.options.index = _value;
		}
		
		if(this.throw)
		{
			throw new Error('Expecting a Boolean');
		}
		
		return this.options.index;
	}
	
	get radix()
	{
		return this.options.radix;
	}
	
	set radix(_value)
	{
		if(this.constructor.isRadix(_value))
		{
			return this.options.radix = _value;
		}
		
		if(this.throw)
		{
			throw new Error('Invalid radix');
		}
		
		return this.options.radix;
	}
	
	get override()
	{
		return this.options.override;
	}
	
	set override(_value)
	{
		if(typeof _value === 'boolean')
		{
			return this.options.override = _value;
		}
		
		if(this.throw)
		{
			throw new Error('Expecting a Boolean');
		}
		
		return this.options.override;
	}
	
	get throw()
	{
		return this.options.throw;
	}
	
	set throw(_value)
	{
		if(typeof _value === 'boolean')
		{
			return this.options.throw = _value;
		}
		
		if(this.throw)
		{
			throw new Error('Expecting a Boolean');
		}
		
		return this.options.throw;
	}
	
	static isRadix(_value)
	{
		if(!Number.isFinite(_value))
		{
			return false;
		}
		
		if((_value % 1) !== 0)
		{
			return false;
		}
		
		return (_value >= RADIX_MIN && _value <= RADIX_MAX);
	}
	
	parseNumber(_string, _radix = this.options.radix, _throw = this.throw)
	{
		return this.constructor.parseNumber(
				_string, _radix);
	}
	
	static parseNumber(_string, _radix = RADIX, _throw = FloatingArray.THROW)
	{
		if(_string.length > STRING_MAX)
		{
			return false;
		}
		
		var	[ string, radix ] = this.
				parseCast(_string);
		
		if(radix === null)
		{
			radix = _radix;
		}
		
		if(!this.isRadix(radix))
		{
			if(_throw)
			{
				throw new Error('Invalid radix');
			}
			
			return null;
		}
		
		string = string.toLowerCase();
		const	split = string.split('.');
		
		if(split.length > 2)
		{
			if(_throw)
			{
				throw new Error('Invalid number string');
			}
			
			return null;
		}

		var	count = 0;
		
		while(split[0][count] === ALPHABET[0])
		{
			++count;
		}
		
		if(count > 0)
		{
			split[0] = split[0].substr(count);
			count = 0;
		}
		
		if(split[1])
		{
			while(split[1][split[1].length - 1 - count] === ALPHABET[0])
			{
				++count;
			}
			
			if(count > 0)
			{
				split[1] = split[1].slice(0, -count);
			}
		}

		var	result = 0,
			negative,
			index,
			mul;
		
		[ split[0], negative ] = this.parseSign(split[0]);
		
		if(split[0])
		{
			mul = 1;
			
			for(var i = split[0].length - 1; i >= 0; --i)
			{
				index = LOOKUP[split[0].charCodeAt(i)];
			
				if((index + 1) > radix)
				{
					if(_throw)
					{
						throw new Error('Invalid character[' + i + '] (`' +
							split[0][i] + '`) in string');
					}
				
					return null;
				}
			
				if((result += (mul * index)) > Number.MAX_SAFE_INTEGER)
				{
					if(_throw)
					{
						throw new Error('Number exceeds limit (' + Number.MAX_SAFE_INTEGER + ')');
					}
				
					return null;
				}
			
				mul *= radix;
			}
		}
		
		if(split[1])
		{
			mul = (1 / radix);
			
			for(var i = 0; i < split[1].length; ++i)
			{
				index = LOOKUP[split[1].charCodeAt(i)];
				
				if((index + 1) > radix)
				{
					if(_throw)
					{
						throw new Error('Invalid character[' + i + '] (`' +
							split[1][i] + '`) in string');
					}
					
					return null;
				}
				
				if((result += (mul * index)) > Number.MAX_VALUE)
				{
					if(_throw)
					{
						throw new Error('Number exceeds limit (' + Number.MAX_VALUE + ')');
					}
					
					return null;
				}
				
				if((mul /= radix) < Number.MIN_VALUE)
				{
					if(_throw)
					{
						throw new Error('Number multiplicator falls below limit (' + Number.MIN_VALUE + ')');
					}
					
					return null;
				}
			}
		}
		
		if(negative)
		{
			result = (-result || 0);
		}
		
		return result;
	}
	
	parseCast(_string, _parse = false, _throw = this.throw)
	{
		return this.constructor.parseCast(
			_string, _parse, _throw);
	}

	static parseCast(_string, _parse = false, _throw = FloatingArray.THROW)
	{
		if(typeof _string !== 'string')
		{
			return [ _string, null ];
		}
		
		if(_string[0] !== '(')
		{
			return [ _string, null ];
		}
		
		const idx = _string.indexOf(')', 1);

		if(idx === -1)
		{
			return [ _string, null ];
		}
		
		const	original = _string;
		var	[ radix, negative ] = this.parseSign(
				_string.substring(1, idx));
		_string = _string.substr(idx + 1);

		if(Number.isNaN(radix = Number(radix)))
		{
			return [ original, null ];
		}
		
		if(negative)
		{
			return [ original, null ];
		}
		
		if(!this.isRadix(radix))
		{
			return [ original, null ];
		}
		
		if(_parse)
		{
			if(!this.isNumber(_string, radix, _throw))
			{
				return [ original, radix ];
			}
			
			return [ this.parseNumber(_string, radix, _throw), radix ];
		}

		return [ _string, radix ];
	}

	isNumber(_string, _radix = this.options.radix, _throw = this.throw)
	{
		return this.constructor.isNumber(
			_string, _radix, _throw);
	}
	
	static isNumber(_string, _radix = RADIX, _throw = FloatingArray.THROW)
	{
		if(Number.isFinite(_string))
		{
			return true;
		}
		
		if(typeof _string !== 'string')
		{
			return false;
		}
		
		if(_string.length > STRING_MAX)
		{
			return false;
		}

		if(!_string)
		{
			return true;
		}
		
		_string = _string.toLowerCase();
		var	[ string, radix ] = this.
				parseCast(_string);

		if(radix === null)
		{
			radix = _radix;
		}
		
		if(!this.isRadix(radix))
		{
			if(_throw)
			{
				throw new Error('Invalid radix');
			}
			
			return null;
		}
		
		const	split = string.split('.');
		
		if(split.length > 2)
		{
			return false;
		}
		
		[ split[0] ] = this.parseSign(split[0]);

		for(const str of split)
		{
			for(var i = 0; i < str.length; ++i)
			{
				if((LOOKUP[str.charCodeAt(i)] + 1) > radix)
				{
					return false;
				}
			}
		}
		
		return true;
	}

	static parseSign(_string)
	{
		var	negative = false;
		
		for(var i = 0; i < _string.length; ++i)
		{
			if(_string[i] === '+')
			{
				continue;
			}
			else if(_string[i] === '-')
			{
				negative = !negative;
			}
			else
			{
				_string = _string.substr(i);
				break;
			}
		}
		
		return [ _string, negative ];
	}
	
	static getIndex(_index, _length)
	{
		if(_length < 1)
		{
			return null;
		}

		if((_index %= _length) < 0)
		{
			_index = (_length + _index);
		}

		return (_index || 0);
	}
	
	getIndex(_index)
	{
		return this.constructor.getIndex(
			_index, this.length);
	}
	
	static get THROW()
	{
		return FloatingArray._THROW;
	}
	
	static set THROW(_value)
	{
		if(typeof _value === 'boolean')
		{
			return FloatingArray._THROW = _value;
		}
		
		if(FloatingArray._THROW)
		{
			throw new Error('Expecting a Boolean');
		}
		
		return FloatingArray._THROW;
	}
}

export default FloatingArray;

//
FloatingArray._THROW = THROW;

//

