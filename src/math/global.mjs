/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
Reflect.defineProperty(globalThis, 'TypedArray', {
	value: Reflect.getPrototypeOf(Uint8Array),
	writable: false, configurable: false,
	enumerable: true });

//

