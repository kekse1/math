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
	CMP "$1 > $2"
}

GE()
{
	CMP "$1 >= $2"
}

LT()
{
	CMP "$1 < $2"
}

LE()
{
	CMP "$1 <= $2"
}

EQ()
{
	CMP "$1 == $2"
}

NE()
{
	CMP "$1 != $2"
}

#

