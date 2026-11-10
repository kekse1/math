/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const	numeric = {};
export	default numeric;

//
numeric.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
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

	Reflect.defineProperty(String, 'isDecimal', { value: (_item, _empty = _default.emptyString) => {
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
};

//

