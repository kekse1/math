(function()
{

	//
	const DEFAULT_NAN_IS_INFINITE = false;
	const DEFAULT_PAD_CUT = true;

	//
	Object.defineProperty(Number, 'isByte', { value: function(_item)
	{
		if(typeof _item === 'number')
		{
			return _item.isByte;
		}

		return null;
		//return numeric.isByte(_item);
	}});

	Object.defineProperty(Number, 'isNumber', { value: function(_item)
	{
		if(typeof _item === 'number')
		{
			return _item.isNumber;
		}

		return null;
		//return numeric.isNumber(_item);
	}});

	Object.defineProperty(Number, 'isInt', { value: function(_item)
	{
		if(typeof _item === 'number')
		{
			return _item.isInt;
		}

		return null;
		//return numeric.isInt(_item);
	}});

	Object.defineProperty(Number, 'isFloat', { value: function(_item)
	{
		if(typeof _item === 'number')
		{
			return _item.isFloat;
		}

		return null;
		//return numeric.isFloat(_item);
	}});

	Object.defineProperty(Number, 'isInfinite', { value: function(_item)
	{
		if(typeof _item !== 'number')
		{
			return null;
		}

		return !Number.isFinite(_item);
	}});

	//
	Object.defineProperty(Number.prototype, 'isByte', { get: function()
	{
		if(this.isInt)
		{
			return (this.valueOf() >= 0 && this.valueOf() <= 255);
		}

		return false;
	}});

	Object.defineProperty(Number.prototype, 'isNumber', { get: function()
	{
		return (this.valueOf() === this.valueOf() && !this.isInfinite);
	}});

	Object.defineProperty(Number.prototype, 'isNaN', { get: function()
	{
		return (this.valueOf() !== this.valueOf());// && !this.isInfinite);
	}});

	Object.defineProperty(Number.prototype, 'isInt', { get: function()
	{
		return (this.isNumber && (this.valueOf() % 1) === 0);
	}});

	Object.defineProperty(Number.prototype, 'isFloat', { get: function()
	{
		return (this.isNumber && (this.valueOf() % 1) !== 0);
	}});

	//
	Object.defineProperty(Number.prototype, 'int', { get: function()
	{
		return Math.int(this.valueOf(), 0);
	}});

	Object.defineProperty(Number.prototype, 'iint', { get: function()
	{
		return Math.iint(this.valueOf(), 0);
	}});

	Object.defineProperty(Number.prototype, 'float', { get: function()
	{
		return (this.valueOf() % 1);
	}});

	Object.defineProperty(Number.prototype, 'abs', { get: function()
	{
		return Math.abs(this.valueOf());
	}});

	//
	Object.defineProperty(Number.prototype, 'isFinite', { get: function()
	{
		return Number.isFinite(this.valueOf());
		//return (this.valueOf() !== Number.POSITIVE_INFINITY && this.valueOf() !== Number.NEGATIVE_INFINITY);
	}});

	Object.defineProperty(Number.prototype, 'isInfinite', { get: function()
	{
		var result = !this.isFinite;

		if(! DEFAULT_NAN_IS_INFINITE)
		{
			if(this.isNaN)
			{
				result = false;
			}
		}

		return result;
	}});

	//
	var MAX_FLOAT_DIGITS = 17;

	Object.defineProperty(Number, 'MAX_FLOAT_DIGITS', {
		get: function()
		{
			return MAX_FLOAT_DIGITS;
		},
		set: function(_value)
		{
			if(typeof _value === 'number')
			{
				return MAX_FLOAT_DIGITS = Math.abs(_value.int);
			}

			return MAX_FLOAT_DIGITS;
		}
	});

	//
	Object.defineProperty(Number.prototype, 'length', { get: function()
	{
		return this.getLength();
	}});

	Object.defineProperty(Number.prototype, 'getLength', { value: function(_radix = 2)
	{
		const value = Math.abs(this.valueOf());

		if(value === 0)
		{
			return 0;
		}

		return Math.floor(Math.logBase(_radix, value) + 1);
	}});

	//
	Object.defineProperty(Number.prototype, 'round', { value: function(_precision = 0)
	{
		if(! Number.isInt(_precision))
		{
			return x('Invalid _precision argument (expecting an Integer)');
		}

		return Math.round(this.valueOf(), _precision);
	}});

	Object.defineProperty(Number.prototype, 'floor', { value: function(_precision = 0)
	{
		if(! Number.isInt(_precision))
		{
			return x('Invalid _precision argument (expecting an Integer)');
		}

		return Math.floor(this.valueOf(), _precision);
	}});

	Object.defineProperty(Number.prototype, 'ceil', { value: function(_precision = 0)
	{
		if(! Number.isInt(_precision))
		{
			return x('Invalid _precision argument (expecting an Integer)');
		}

		return Math.ceil(this.valueOf(), _precision);
	}});

	//
	Object.defineProperty(Number.prototype, 'toPositive', { value: function()
	{
		return Math.abs(this.valueOf());
	}});

	Object.defineProperty(Number.prototype, 'toNegative', { value: function(_minus_null = false)
	{
		const result = (-this.toPositive());

		if(!_minus_null && result === 0)
		{
			return 0;
		}

		return result;
	}});

	//
	//TODO/
	//TODO/ueberall umsetzen! see bigint.from()! ;-)
	//
	Object.defineProperty(Number, 'from', { value: function(... _args)
	{
		return Number(... _args);
	}});

	//
	Object.defineProperty(Number, 'type', { value: function(_number)
	{
		if(typeof _number === 'number')
		{
			return _number.type;
		}

		return '';
	}});

	Object.defineProperty(Number.prototype, 'type', { get: function()
	{
		if(this.isInt)
		{
			return 'Integer';
		}
		else if(this.isFloat)
		{
			return 'Float';
		}
		else if(this.isNaN)
		{
			return 'NaN';
		}
		else if(this.isInfinite)
		{
			return 'Infinity';
		}

		return 'Unknown';
	}});

	//
	Object.defineProperty(Number, 'equal', { value: function(... _args)
	{
		if(_args.length === 0)
		{
			return null;
		}
		else if(typeof _args[0] !== 'number')
		{
			return x('All of your arguments need to be %s', null, 'Number');
		}
		else if(_args.length === 1)
		{
			return true;
		}
		else for(var i = 1; i < _args.length; ++i)
		{
			if(typeof _args[i] !== 'number')
			{
				return x('Your %[%] is not a %', null, '..._args', i, 'Number');
			}
			else if(_args[i] !== _args[0])
			{
				return false;
			}
		}

		return true;
	}});

	//

})();

//
module.exports = Number;

