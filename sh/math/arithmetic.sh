# 
# Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
# https://kekse.biz/ https://github.com/kekse1/math/
#

#
CALC()
{
	awk "BEGIN { print ($*) }"
}

CMP()
{
	(( $(awk "BEGIN { print ($*) }") ))
}

GT()
{
	_compare "$1 > $2"
}

GE()
{
	_compare "$1 >= $2"
}

LT()
{
	_compare "$1 < $2"
}

LE()
{
	_compare "$1 <= $2"
}

EQ()
{
	_compare "$1 == $2"
}

NE()
{
	_compare "$1 != $2"
}

#

