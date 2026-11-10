#!/usr/bin/bash

#
_real="$(realpath "$0")"
_dir="$(dirname "$_real")"

source "${_dir}/../../../src/sh/math.sh"

#
SIZE $((RANDOM*RANDOM))

