/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const func = {};
export default func;

//
func.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	Reflect.defineProperty(Math, '_round', Reflect.getOwnPropertyDescriptor(Math, 'round'));
	Reflect.defineProperty(Math, 'round', { value: (_value, _precision = _default.round || 0) => {
		const coefficient = Math.pow(10, _precision);
		return ((Math._round(_value * coefficient) / coefficient) || 0);
	}});

	Reflect.defineProperty(Math, '_floor', Reflect.getOwnPropertyDescriptor(Math, 'floor'));
	Reflect.defineProperty(Math, 'floor', { value: (_value, _precision = _default.round || 0) => {
		const coefficient = Math.pow(10, _precision || 0);
		return ((Math._floor(_value * coefficient) / coefficient) || 0);
	}});

	Reflect.defineProperty(Math, '_ceil', Reflect.getOwnPropertyDescriptor(Math, 'ceil'));
	Reflect.defineProperty(Math, 'ceil', { value: (_value, _precision = _default.round || 0) => {
		const coefficient = Math.pow(10, _precision || 0);
		return ((Math._ceil(_value * coefficient) / coefficient) || 0);
	}});
};

//

