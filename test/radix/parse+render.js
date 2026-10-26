#!/usr/bin/env node

//
import	math from '../../src/math.mjs';

//
console.dir({
	parse: Number.parse('---ffff', 16),
	render: (-65535).render(16),
	bigint: (-65535n).render(16)
});

