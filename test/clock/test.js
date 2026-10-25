#!/usr/bin/env node

//
import	math from '../../src/math.mjs';

//
const diffTest = '*:*:30:*';

//
// some test cases. 2nd (bool) is if it's expected to be successfull.
//
const TEST = [

	[ '25',			false	],
	[ '28:45',		false	],
	[ '10::61',		false	],
	[ '*3:',		false	],
	[ ':*4',		false	],

	[ '+4pm',		true	],
	[ '-4pm',		true	],
	[ '*:-10:-80:*::am',	true	],
	[ '17pm',		true	],
	[ '',			true	],
	[ '@@',			true	],
	[ 'am',			true	],
	[ 'pm',			true	],
	[ '@8pm',		true	],
	[ '@@17',		true	],
	[ '6:*::::',		true	],
	[ '6:*:pm',		true	],
	[ '6:*pm',		true	],
	[ '10::59',		true	],
	[ '12:23:42:250',	true	],
	[ '@4:12pm',		true	],
	[ '-1',			true	],
	[ '2::8',		true	],
	[ '2:*:8',		true	],
	[ '2:*::8',		true	],
	[ ':::*',		true	],
	[ '2:*::*pm',		true	],
	[ '+2',			true	],
	[ '-6',			true	],
	[ ':-6',		true	],
	[ '*:-6',		true	],
	[ '4pm',		true	],
	[ '-4',			true	],
	[ '*:-10:-80:*',	true	],
	[ '::::pm',		true	],
	[ ':::::::pm',		true	],
	[ '::30:',		true	],
	[ '*:*:30:*',		true	],
	[ '*',			true	],
	[ '**',			true	],
	[ ':**',		true	],
	[ '::**',		true	],
	[ ':::**',		true	],
	[ '::*',		true	],
	[ '@*:*:30:*',		true	],
	[ ':30**pm',		true	],
	[ ':30:**pm',		true	],
	[ '2pm',		true	],
	[ '2:**pm',		true	],
	[ '2**pm',		true	]

];

TEST.push([ diffTest, true ]);

//
const WRONG = [];

//
const RESULT = new Array(TEST.length);

for(var i = 0; i < TEST.length; ++i)
{
	RESULT[i] = [ ... TEST[i], Math.time.
		clock(TEST[i][0]) ];
	
	if(TEST[i][1])
	{
		if(RESULT[i][2] === null)
		{
			WRONG.push(RESULT[i]);
		}
	}
	else if(RESULT[i][2] !== null)
	{
		WRONG.push(RESULT[i]);
	}
}

console.dir(RESULT, { depth: 666 });

//
console.dir({ [diffTest]:
	Math.time.clock.parse(
		diffTest, null, true) });

//
if(WRONG.length > 0)
{
	console.dir({ WRONG }, { depth: 777 });
}


