/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 *
 */



		/* PURE *TODO*!!1 */





	//
	Reflect.defineProperty(Number, 'timeout', { value: (_millisec) => {
		if(!number(_millisec))
		{
			return null;
		}

		_millisec = Math.trunc(_millisec);

		if(_millisec > Number.MAX_TIMEOUT)
		{
			return null;
		}
		
		return _millisec;
	}});

	Reflect.defineProperty(Number, 'MAX_TIMEOUT', {
		get: () => (((2 ** 32) / 2) - 1) });

	//
	const _setTimeout = setTimeout;
	const _setInterval = setInterval;
	const _clearTimeout = clearTimeout;

	global.setInterval = function setInterval(_handler, _time, ... _args)
	{
		if(Math.time?.clock?.parse)
		{
			_time = Math.time.clock.
				parse(_time);
		}

		if(int(_time) && _time > Number.MAX_TIMEOUT)
		{
			throw new Error('Time limit exceeded (' + _time +
				' / ' + Number.MAX_TIMEOUT + ')');
		}

		return _setInterval(
			_handler, _time,
			... _args);
	}

	global.setTimeout = function setTimeout(_handler, _time, ... _args)
	{
		if(typeof _handler !== 'function')
		{
			throw new Error('First argument needs ' +
				'to be a Function');
		}
		
		if(number(_time))
		{
			_time = Math.trunc(_time);
		}
		else if(typeof _time === 'string')
		{
			if(Math.time?.clock?.parse)
			{
				if((_time = Math.time.clock.
					parse(_time)) === null)
				{
					throw new Error('Unable to parse _time');
				}
			}
			else if(isNaN(_time))
			{
				_time = Math.trunc(
					Number(_time));
			}
			else
			{
				//
				//todo/
				//
				//.warn() oder so..
				//
				_time = 1;
			}
		}
		else
		{
			_time = 0;
		}

		const LIMIT = Number.MAX_TIMEOUT;

		if(_time <= LIMIT)
		{
			const t = _setTimeout(
				_handler, _time,
				... _args);
			t.TIMEOUT = _time;
			t.LIMIT = LIMIT;
			t.split = [ t ];
			t.REST = _time;
			return t;
		}

		var	NEXT, rest = _time,
			next = Math.min(
				rest, LIMIT),
			index = 0;
		const	split = new Array(Math._ceil(
				_time / LIMIT)).
					fill(null);

		const localHandler = () => {
			if((rest -= next) <= 0)
			{
				return _handler(
					... _args);
			}

			if(NEXT.__stopped)
			{
				return;
			}

			next = Math.min(
				rest, LIMIT);
			NEXT = _setTimeout(
				localHandler,
				next);
			NEXT.TIMEOUT = _time;
			NEXT.LIMIT = LIMIT;
			(NEXT.split = split)[
				index++] = NEXT;
			NEXT.REST = rest;
		};

		NEXT = _setTimeout(
			localHandler, next);
		(NEXT.split = split)[
			index++] = NEXT;
		NEXT.TIMEOUT = _time;
		NEXT.LIMIT = LIMIT;
		NEXT.REST = rest;

		return NEXT;
	}

	global.clearTimeout = (... _args) => {
		for(const t of _args) if(t)
		{
			try
			{
				if(t.split) for(const tt of t.split)
				{
					_clearTimeout(tt);
					tt.__stopped = true;
				}
				else
				{
					_clearTimeout(t);
					t.__stopped = true;
				}
			}
			catch(_err)
			{
			}
		}
	};


