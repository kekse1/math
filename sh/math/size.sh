# 
# Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
# https://kekse.biz/ https://github.com/kekse1/math/
#

#
SIZE()
{
	local _bytes=$1
	local _base_unit=$2
	local _prec=$3

	echo -e "[1] $_bytes\n[2] $_base_unit\n[3] $_prec\n"
	return 255
}

BYTES()
{
	local _bytes=$1
	local _unit=$2	# optional - maybe encoded in first param..

	echo -e "[1] $_bytes\n[2] $_unit\n"
	return 255
}

_1024=( Bytes KiB MiB GiB TiB PiB EiB ZiB YiB )
_1000=( Bytes KB MB GB TB PB EB ZB YB )

_getUnit()
{
	echo TODO >&2
	return 255
}


