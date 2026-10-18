#!/usr/bin/env node

//
const	COUNT = 8,
	ROUND = 8;

//
import * as math from '../../src/math.mjs';

//
const	number = new Array(COUNT),
	bigInt = new Array(COUNT),
	strNum = new Array(COUNT),
	strBig = new Array(COUNT),
	result = new Array(COUNT);

//
for(var i = 0; i < COUNT; ++i)
{
	number[i] = Math.round(Math.random.float(65536, -65536), ROUND);
	bigInt[i] = BigInt(Math.trunc(number[i]));
}

for(var i = 0; i < COUNT; ++i)
{
	result[i] = {
		[number[i]]: Number.
			toBytes(number[i],
				true, false),
		[bigInt[i]]: BigInt.
			toBytes(bigInt[i],
				true, false) };

	strNum[i] = Number.fromBytes(
		result[i][number[i]]);
	strBig[i] = BigInt.fromBytes(
		result[i][bigInt[i]]);

	result[i].number = strNum[i];
	result[i].bigint = strBig[i];
}

console.dir(result, { compact: false, depth: 4 });

