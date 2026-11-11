if(typeof BigInt === 'undefined')
{
	module.exports = null;
}
else (function()
{

	//
	Object.defineProperty(BigInt, 'isBigInt', { value: function(... _args)
	{
		if(_args.length === 0)
		{
			return null;
		}
		else for(var i = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] !== 'bigint')
			{
				return false;
			}
		}

		return true;
	}});

	//
	Object.defineProperty(BigInt.prototype, 'pad', { value: function(_pad = 0, _toText = true, _fill = '0', _lang = LANGUAGE)
	{
		return padNumber(this.valueOf(), _pad, _toText, _fill, null, _lang);
	}});

	Object.defineProperty(BigInt, 'pad', { value: function(_value, _pad, _toText = true, _fill = '0', _lang = LANGUAGE)
	{
		if(! BigInt.isBigInt(_value))
		{
			return x('Expecting a BigInt as first argument');
		}

		return _value.pad(_pad, _toText, _fill, _lang);
	}});

	//
	Object.defineProperty(BigInt.prototype, 'length', { get: function()
	{
		return this.getLength();
	}});

	Object.defineProperty(BigInt.prototype, 'getLength', { value: function(_radix = 2)
	{
		const value = Math.abs(this.valueOf());
		
		if(value === 0n)
		{
			return 0;
		}

		return (Math.logBase(_radix, value) + 1);
	}});

	//
//TODO/TypedArray support!!!
	Object.defineProperty(BigInt, 'from', { value: function(_numeric, _nan = true, _throw = true)
	{
		if(typeof _numeric === 'bigint')
		{
			return _numeric;
		}
		else if(typeof _numeric === 'string')
		{
			if(_numeric[_numeric.length - 1] === 'n')
			{
				_numeric = _numeric.removeLast();
			}

			return BigInt(_numeric);
		}
		else if(typeof _numeric === 'boolean')
		{
			return (_numeric ? 1n : 0n);
		}
		else if(Number.isNumber(_numeric))
		{
			return BigInt(_numeric.int);
		}
		else if(_nan && typeof _numeric === 'number')
		{
			return 0n;
		}
	
		try
		{
			return BigInt(_numeric);
		}
		catch(_error)
		{
			if(_throw)
			{
				x(_error);
			}

			return 0n;
		}
	}});

	//
	Object.defineProperty(BigInt.prototype, 'toPositive', { value: function()
	{
		return Math.abs(this.valueOf());
	}});

	Object.defineProperty(BigInt.prototype, 'toNegative', { value: function()
	{
		return (-Math.abs(this.valueOf()));
	}});

	Object.defineProperty(BigInt.prototype, 'abs', { get: function()
	{
		return Math.abs(this.valueOf());
	}});
	
	//
	Object.defineProperty(BigInt, 'equal', { value: function(... _args)
	{
		if(_args.length === 0)
		{
			return null;
		}
		else if(typeof _args[0] !== 'bigint')
		{
			return x('Expecting only %s', null, 'BigInt');
		}
		else if(_args.length === 1)
		{
			return true;
		}
		else for(var i = 1; i < _args.length; ++i)
		{
			if(typeof _args[i] !== 'bigint')
			{
				return x('Your %[%] is not a %', null, '..._args', i, 'BigInt');
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

module.exports = (typeof BigInt === 'undefined' ? null : BigInt);

