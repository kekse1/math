/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const	date = {};
export	default date;

//
date.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	//
	Reflect.defineProperty(Date, 'currentLocale', { get: () => Intl.
		DateTimeFormat().resolvedOptions().locale });

	Reflect.defineProperty(Date.prototype, '_toString',
		Reflect.getOwnPropertyDescriptor(Date.prototype, 'toString'));

	Reflect.defineProperty(Date.prototype, 'toString', { value: function(... _args)
	{
		if(_args.length === 0 || !_args[0])
		{
			return this._toString.apply(this, _args);
		}

		const params = new Array(2);

		if(typeof _args[0] === 'string' && _args[0].length > 0)
		{
			params[0] = _args.shift();
		}
		else
		{
			params[0] = Date.currentLocale;
		}

		const opts = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit' };

		params[1] = Object.assign(opts, _args.shift());
		return this.toLocaleString(... params);
	}});
	
	//
	
};

//

