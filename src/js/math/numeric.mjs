/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const	DEFAULT_POW = 53,
	DEFAULT_MAX = ((2**DEFAULT_POW)-1),
	DEFAULT_MIN = -DEFAULT_MAX;

//
const	numeric = {};
export	default numeric;

//
numeric.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	//
	Reflect.defineProperty(Number, 'MAX', { value: DEFAULT_MAX,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(Number, 'MIN', { value: DEFAULT_MIN,
		writable: false, configurable: false, enumerable: true });
	Reflect.defineProperty(Number, 'POW', { value: DEFAULT_POW,
		writable: false, configurable: false, enumerable: true });

	//
	Reflect.defineProperty(globalThis, 'isNumeric', { value: (_item) => {
		if(Number.isFinite(_item))
		{
			return true;
		}

		if(typeof _item === 'bigint')
		{
			return true;
		}

		return false;
	}});

	Reflect.defineProperty(Number, 'isInt', { value: (_item) => {
		if(Number.isFinite(_item))
		{
			return ((_item % 1) === 0);
		}

		return false;

	}});

	Reflect.defineProperty(Number, 'isFloat', { value: (_item) => {
		if(Number.isFinite(_item))
		{
			return ((_item % 1) !== 0);
		}

		return false;
	}});

	Reflect.defineProperty(String, 'isDecimal', { value: (_item, _empty = _default.empty) => {
		if(typeof _item !== 'string')
		{
			return false;
		}

		if(_item.length === 0)
		{
			return _empty;
		}

		var	point = false,
			byte;

		for(var i = 0; i < _item.length; ++i)
		{
			if(_item[i] === '.')
			{
				if(point)
				{
					return false;
				}

				point = true;
			}
			else if((byte = _item.charCodeAt(i)) < 48 || byte > 57)
			{
				return false;
			}
		}

		return true;
	}});

	//
	//TODO/NOCH GANZ VIEL ERWEITERN HIER!!11 ;-D
	//
	Reflect.defineProperty(BigInt, 'from', { value: (_value, _radix = _default.radix) => {
		var result;

		if(typeof _value === 'string')
		{
			if(_value.length === 0)
			{
				result = 0n;
			}
			else if(_radix === 10)
			{
				if(_value[_value.length - 1] === 'n')
				{
					_value = _value.slice(0, -1);
				}

				result = BigInt(_value);
			}
			else
			{
				throw new Error('TODO (w/ `radix.mjs`)');
			}
		}
		else if(Number.isFinite(_value))
		{
			result = BigInt(Math.trunc(_value));
		}
		else if(typeof _value === 'bigint')
		{
			result = _value;
		}
		else
		{
			throw new Error('TODO (w/ `radix.mjs`)');
		}

		return result;
	}});

	//

};

//

