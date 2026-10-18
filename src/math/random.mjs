/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const random = {};
export default random;

//
random.initialize = (_math = globalThis.math, _default = _math.DEFAULT) => {
	random.bool = Math.random.bool = () => (Math.random() >= 0.5);

	random.int = Math.random.int = (_max = 255, _min = 0, _inclusive = true) => {
		[ _max, _min ] = [
			Math.trunc(Math.max(_max, _min)),
			Math.trunc(Math.min(_min, _max)) ];
		return ((Math.floor(Math.random() *
			(_max - _min + (_inclusive ? 1 : 0))) + _min) || 0);
	};

	random.float = Math.random.float = (_max = 255, _min = 0, _inclusive = true) => {
		[ _max, _min ] = [
			Math.max(_max, _min),
			Math.min(_min, _max) ];
		return ((Math.random() * (_max - _min +
			(_inclusive ? 1 : 0)) + _min) || 0);
	};
};

//

