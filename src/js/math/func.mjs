/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const	func = {};
export	default func;

//
func.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	//
	Reflect.defineProperty(Math, '_round',
		Reflect.getOwnPropertyDescriptor(Math, 'round'));
	Reflect.defineProperty(Math, 'round', { value: (_value, _precision = _default.round || 0) => {
		if(typeof _value === 'bigint') return _value;
		const coefficient = Math.pow(10, _precision);
		return ((Math._round(_value * coefficient) / coefficient) || 0);
	}});

	Reflect.defineProperty(Math, '_floor',
		Reflect.getOwnPropertyDescriptor(Math, 'floor'));
	Reflect.defineProperty(Math, 'floor', { value: (_value, _precision = _default.round || 0) => {
		if(typeof _value === 'bigint') return _value;
		const coefficient = Math.pow(10, _precision || 0);
		return ((Math._floor(_value * coefficient) / coefficient) || 0);
	}});

	Reflect.defineProperty(Math, '_ceil',
		Reflect.getOwnPropertyDescriptor(Math, 'ceil'));
	Reflect.defineProperty(Math, 'ceil', { value: (_value, _precision = _default.round || 0) => {
		if(typeof _value === 'bigint') return _value;
		const coefficient = Math.pow(10, _precision || 0);
		return ((Math._ceil(_value * coefficient) / coefficient) || 0);
	}});

	//
	Reflect.defineProperty(Math, 'gcd', { value: func.gcd = (_a, _b) => {
		if(_b) return func.gcd(_b, _a % _b);
		return _a;
	}});

	//
	Reflect.defineProperty(Math, 'logBase', { value: func.logBase = (_value, _base) => {
		var result;

		if(!isNumeric(_base) || !_base)
		{
			_base = 0;
		}
		
		if(typeof _value === 'bigint')
		{
			if(_value === 0n || !_base)
			{
				result = 0n;
			}
			else
			{
				var	rest = Math.abs(_value),
					result = 0n;
				_base = BigInt.from(_base);

				while(rest >= _base)
				{
					rest /= _base;
					++result;
				}
			}
		}
		else if(Number.isFinite(_value))
		{
			if(_value === 0 || !_base)
			{
				result = 0;
			}
			else
			{
				result = (Math.log(Math.abs(_value)) /
					Math.log(Number(_base)));
			}
		}
		else if(_default.throw)
		{
			throw new Error('Expecting numeric argument');
		}
		else
		{
			result = null;
		}

		return result;
	}});

	//
	Reflect.defineProperty(Math, '_abs',
		Reflect.getOwnPropertyDescriptor(Math, 'abs'));
	Reflect.defineProperty(Math, 'abs', { value: func.abs = (_value) => {
		var result;

		if(Number.isFinite(_value))
		{
			result = Math._abs(_value);
		}
		else if(typeof _value === 'bigint')
		{
			if(_value >= 0n)
			{
				result = _value;
			}
			else
			{
				result = -_value;
			}
		}
		else if(_default.throw)
		{
			throw new Error('Expecting a numeric parameter');
		}
		else
		{
			result = null;
		}

		return (result || 0);
	}});

	//

};

//

