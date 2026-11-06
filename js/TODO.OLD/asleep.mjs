(() => {
	Math.time.unit = [
		[ 1000, 'milliseconds', 'ms' ],
		[ 60, 'seconds', 's' ],
		[ 60, 'minutes', 'm' ],
		[ 24, 'hours', 'h' ],
		[ 30, 'days', 'd' ],
		/*[ 7, 'days', 'd' ],
		[ 4, 'weeks', 'w' ],*/
		[ 12, 'months', 'o' ],
		[ 0, 'years', 'y' ]
	];

	Math.time.units = {};
	var _sum = 1;

	for(var i = 0; i < Math.time.unit.length; ++i)
	{
		Math.time.units[Math.time.unit[i][2]] = _sum;
		_sum *= Math.time.unit[i][0];
	}
})();

Reflect.defineProperty(Math.time, 'parse', { value: (_value) => {
	if(typeof _value !== 'string')
	{
		return null;
	}
	
	if(_value.length === 0)
	{
		return 0;
	}
	
	var	result = 0,
		value = '',
		unit = '',
		byte;
	const	units = Math.time.units;
	
	const	add = (_value, _unit) => {
		if(!_value)
		{
			if(!_unit)
			{
				return true;
			}
			
			_value = '1';
		}
		
		_value = Math.sign(_value, true);

		if(Number.isNaN(_value = Number(_value)))
		{
			return false;
		}
		
		if(_unit)
		{
			if(_unit in units)
			{
				result += (_value * units[_unit]);
			}
			else
			{
				return false;
			}
		}
		else
		{
			result += (_value * 1000);
		}
		
		return true;
	};
	
	for(var i = 0; i < _value.length; ++i)
	{
		if((byte = _value.charCodeAt(i)) <= 32 || byte === 127)
		{
			continue;
		}
		
		if(_value[i] === '+' || _value[i] === ',' || _value[i] === ' ' || _value[i] === '\t')
		{
			if(!add(value, unit))
			{
				return null;
			}
			
			value = unit = '';
		}
		else if(_value[i] === '-')
		{
			if(value)
			{
				if(value === '-')
				{
					value = '';
				}
				else if(add(value, unit))
				{
					unit = '';
					value = '-';
				}
				else
				{
					return null;
				}
			}
			else
			{
				value = '-';
			}
		}
		else if(_value[i] === '.')
		{
			if(unit)
			{
				if(!add(value, unit))
				{
					return null;
				}

				unit = '';
				value = '0.';
			}
			else if(!value.includes('.'))
			{
				value += '.';
			}
			else
			{
				return null;
			}
		}
		else if(unit)
		{
			if(!_value[i].isDecimal)
			{
				unit += _value[i];
			}
			else if(add(value, unit))
			{
				value = _value[i];
				unit = '';
			}
			else
			{
				return null;
			}
		}
		else if(_value[i].isDecimal)
		{
			value += _value[i];
		}
		else
		{
			unit += _value[i];
		}
	}

	if((value || unit) && !add(value, unit))
	{
		return null;
	}
	
	return result;
}});

// man.. that's a bad one.
// ... find my newest, better version @ https://kekse.biz/ ..
Reflect.defineProperty(Math.time, 'render', { value: (_value, _millisec = DEFAULT_MILLISEC, _long = DEFAULT_LONG, _sep = DEFAULT_SEP) => {
	if(typeof _value === 'bigint')
	{
		_value = Number(_value / 1000000n);
	}
	else if(typeof _value !== 'number')
	{
		return '-/-';
	}
	
	_value = Math.abs(_value);

	const orig = _value,
		append = (_value, _unit) => {
			if(_value < 1) return;
			if(_long && (_value = Math.trunc(_value)) === 1 &&
				_unit[_unit.length - 1] === 's') _unit = _unit.slice(0, -1);
			if(index === 0 && orig >= 1000 && !_millisec) return;
			var res = Math.trunc(_value).toString();
			return (result = (res + _unit + _sep) + result); };
	
	const	unit = Math.time.unit;
	var	result = '', index = -1,
		u, v;

	if(_value < 1)
	{
		return '0';
	}
	else while(_value >= 1)
	{
		if(!(u = unit[++index]))
		{
			break;
		}
		
		v = _value;
		if(u[0] > 1) v %= u[0];
		append(v, (_long ? ' ' + u[1] : u[2]));
		if(u[0] > 0) _value /= u[0];
		else break;
	}
	
	return result.slice(0, -_sep.length).trim();
}});

//
//TODO/getopt parameter(s)s for locale w/ date-time-format(s), etc..!1
//


Reflect.defineProperty(String.prototype, 'isDecimal', { get: function()
{
	var	string = this.valueOf(),
		hadChar = false,
		c = 0, byte;

	while(string[c] === '-' || string[c] === '+')
	{
		++c;
	}

	if(c > 0)
	{
		string = string.substr(c);
	}

	if(string.length === 0)
	{
		return null;
	}
	
	for(var i = 0; i < string.length; ++i)
	{
		if(string[i] === '.')
		{
			if(hadChar)
			{
				return false;
			}
			
			hadChar = true;
		}
		else if((byte = string.charCodeAt(i)) < 48 || byte > 57)
		{
			return false;
		}
	}
	
	return true;
}});
