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
Reflect.defineProperty(globalThis, 'BROWSER', {
	get: () => (globalThis.WEB &&
			self === window &&
			typeof window.document !== 'undefined'),
	configurable: false, enumerable: true });

Reflect.defineProperty(globalThis, 'NODE', {
	get: () => (typeof process !== 'undefined' &&
			typeof process.versions !== 'undefined' &&
				!!process.versions.node),
	configurable: false, enumerable: true });

//
//the following boths don't really need attention.. but they're *used* (above)! ^_^
//
Reflect.defineProperty(globalThis, 'WEB', {
	get: () => (typeof self !== 'undefinbed' &&
			typeof window !== 'undefined'),
	configurable: false, enumerable: true });

Reflect.defineProperty(globalThis, 'WORKER', {
	get: () => (typeof self !== 'undefined' &&
			typeof window !== 'undefined'),/* &&
			typeof importScripts === 'function'),*/
	configurable: false, enumerable: true });

//

