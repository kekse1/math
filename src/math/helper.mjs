/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const helper = {};
export default helper;

//
helper.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	Reflect.defineProperty(Reflect, 'is', { value: (... _args) => {
		throw new Error('todo');
	}});
	
	Reflect.defineProperty(Reflect, 'was', { value: (... _args) => {
		throw new Error('todo');
	}});
	
	Reflect.defineProperty(Uint8Array, 'create', { value: (... _args) => {
		var	length = 0,
			item;
		
		for(var i = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] === 'string')
			{
				if(_args[i].length > 0)
				{
					item = new Uint8Array(_args[i].length);
					
					for(var j = 0; j < _args[i].length; ++j)
					{
						item[j] = _args.charCodeAt(j);
					}

					length += (_args[i] = item).length;
				}
				else
				{
					_args.splice(i--, 1);
				}
			}
			else if(Reflect.was(_args[i], 'Uint8Array') || Reflect.was(_args[i], 'Uint8ClampedArray'))
			{
				if(_args[i].length > 0)
				{
					length += _args[i].length;
				}
				else
				{
					_args.splice(i--, 1);
				}
			}
			else if(Number.isFinite(_args[i]))
			{
				if(_args[i] >= 1)
				{
					_args[i] = Math.trunc(_args[i]);
				}
				else
				{
					_args.splice(i--, 1);
				}
			}
			else
			{
				_args.splice(i--, 1);
			}
		}
		
		if(length <= 0)
		{
			return new Uint8Array();
		}
		
		const	result = new Uint8Array(length);
		var	offset = 0;
		
		for(var i = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] === 'number')
			{
				offset += _args[i];
			}
			else
			{
				result.set(_args[i], offset);
				offset += _args[i].length;
			}
		}
		
		return result;
	}});
	
	Reflect.defineProperty(String, 'create', { value: (... _args) => {
		var result = '';
		
		for(var i = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] === 'string')
			{
				result += _args[i];
			}
			else if(Reflect.was(_args[i], 'Uint8Array') || Reflect.was(_args[i], 'Uint8ClampedArray'))
			{
				for(var j = 0; j < _args[i].length; ++j)
				{
					result += String.fromCharCode(_args[j]);
				}
			}
			else if(Number.isFinite(_args[i]))
			{
				result += String.fromCharCode(
					Math.trunc(Math.abs(_args[i])));
			}
		}
		
		return result;
	}});
};

//

