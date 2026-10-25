/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const	clock = {};
export	default clock;

//
clock.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	//
	_math.clock = Math.time.clock = (_data, _date) => {
		if(typeof _data !== 'string')
		{
			return null;
		}

		_data = __mathTimeClockPrepareAndCleanClockString(_data);

		var meridiem;
		
		if(_data.endsWith('am'))
		{
			meridiem = 'am';
		}
		else if(_data.endsWith('pm'))
		{
			meridiem = 'pm';
		}
		else
		{
			meridiem = '';
		}

		if(meridiem)
		{
			_data = _data.slice(
				0, -2).trim();
		}

		const checkMeridiem = (_item) => {
			switch(meridiem)
			{
				case 'am':
					if(_item[0] >= 12)
						_item[0] -= 12;
					break;
				case 'pm':
					if(_item[0] < 12)
						_item[0] += 12;
					break;
			}

			return _item;
		};

		if(!(_data = __mathTimeClockPrepareAndCleanClockString(_data)))
		{
			return checkMeridiem([ 0, 0, 0, 0 ]);
		}

		if(!_date)
		{
			_date = new Date();
		}

		if(_data.startsWith('**'))
		{
			return checkMeridiem(_math.clock.
				getCurrent(null, _date));
		}

		const checkInt = () => {
			if(result[state] === '')
			{
				result[state++] = 0;
				return true;
			}

			if(result[state] === '*')
			{
				result[state] = _math.clock.
					getCurrent(state++, _date);
				return true;
			}
			
			var relative = (result[state][0] === '+' ||
					result[state][0] === '-');

			if(relative)
			{
				relative = result[state][0];
				result[state] = Number(
					result[state].substr(1));
			}
			else
			{
				result[state] = Number(
					result[state]);
			}

			if(relative)
			{
				var value = _math.clock.
					getCurrent(state, _date);

				switch(relative)
				{
					case '+':
						value += result[state];
						break;
					case '-':
						value -= result[state];
						break;
				}

				if((value %= __intLimit[state]) < 0)
				{
					value = (__intLimit[state] + value);
				}

				result[state] = value;
			}
			else if(result[state] >= __intLimit[state])
			{
				return false;
			}

			++state;
			return true;
		};

		const	result = [ '', '', '', '' ];
		var	state = 0, char, byte;

		for(var i = 0; i < _data.length; ++i)
		{
			char = _data[i].toLowerCase();

			if(char === '@')
			{
				continue;
			}

			if(char === ':')
			{
				if(!checkInt())
				{
					return null;
				}

				if(_data[i + 1] === '*' && _data[i + 2] === '*')
				{
					//
					//todo/.. etwas dubios. ...
					//
					if(i > 0 && _data[i - 1] !== ':' && !checkInt())
					{
						return null;
					}
				}
			}
			else if(char === '+' || char === '-')
			{
				if(result[state] !== '')
				{
					return null;
				}

				result[state] = char;
			}
			else if(char === '*')
			{
				if(_data[i + 1] === '*')
				{
					if(result[state] !== '')
					{
						if(!checkInt())
						{
							return null;
						}
					}

					for(; state < 4; ++state)
					{
						result[state] = _math.clock.
							getCurrent(state, _date);
					}

					break;
				}
				
				if(result[state] !== '')
				{
					return null;
				}

				result[state] = '*';
			}
			else if((byte = char.charCodeAt()) >= 48 && byte <= 57)
			{
				if(result[state][0] === '*')
				{
					return null;
				}

				result[state] += char;

				if(result[state].length > __strLimit[state])
				{
					return null;
				}
			}
			else
			{
				return null;
			}

			if(state > 3)
			{
				break;
			}
		}

		while(state < 4)
		{
			if(!checkInt())
			{
				return null;
			}
		}

		return checkMeridiem(result);
	};

	_math.clock.parse = Math.time.clock.parse = (_data, _date) => {
		if(typeof _data !== 'string')
		{
			if(typeof _data === 'number')
			{
				return _data;
			}

			return null;
		}

		if(!_date)
		{
			_date = new Date();
		}

		const strings = (_data = __mathTimeClockPrepareAndCleanClockString(_data)).
			split('@', 2);

		if(strings.length === 2)
		{
			if(strings[1][0] !== '@')
			{
				strings[1] = '@' + strings[1];
			}
		}
		else
		{
			strings[1] = '';
		}

		strings[0] = __mathTimeClockPrepareAndCleanClockString(strings[0]);
		strings[1] = __mathTimeClockPrepareAndCleanClockString(strings[1]);

		var result;

		if(strings[0] && _math.time.parse)
		{
			if((result = _math.time.parse(strings[0])) === null)
			{
				return null;
			}
		}
		else
		{
			result = 0;
		}

		if(!strings[1])
		{
			return result;
		}

		if((strings[1] = _math.clock(strings[1], _date)) === null)
		{
			return null;
		}

		var value = _date.getDate();

		if(_math.clock.isTomorrow(strings[1], _date))
		{
			++value;
		}

		value = new Date(
			_date.getFullYear(),
			_date.getMonth(),
			value, ... strings[1]);
		result += (value.getTime() -
			_date.getTime());

		return result;
	};

	_math.clock.getCurrent = Math.time.clock.getCurrent = (_unit, _date) => {
		if(!_date)
		{
			_date = new Date();
		}

		if(typeof _unit === 'number') switch(_unit)
		{
			case 0: return _date.getHours();
			case 1: return _date.getMinutes();
			case 2: return _date.getSeconds();
			case 3: return _date.getMilliseconds();
			default: return null;
		}
		
		const result = new Array(4);
		
		for(var i = 0; i < result.length; ++i)
		{
			result[i] = _math.clock.
				getCurrent(i, _date);
		}
		
		return result;
	};

	_math.clock.isToday = Math.time.clock.isToday = (_clock, _date) => {
		if(!_date)
		{
			_date = new Date();
		}
		
		var curr; for(var i = 0; i < _clock.length; ++i)
		{
			curr = _math.clock.getCurrent(
					i, _date);

			if(_clock[i] < curr)
			{
				return false;
			}

			if(_clock[i] > curr)
			{
				break;
			}
		}

		return true;
	};

	_math.clock.isTomorrow = Math.time.clock.isTomorrow =
		(... _args) => !_math.clock.isToday(... _args);

	//
	const __intLimit = [ 24, 60, 60, 1000 ];
	const __strLimit = [ 3, 3, 3, 4 ];

	const __mathTimeClockPrepareAndCleanClockString =
		(_data) => _data.trim().toLowerCase();

	//

};

//

