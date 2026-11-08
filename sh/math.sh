# 
# Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
# https://kekse.biz/ https://github.com/kekse1/math/
#

#
_real="$(realpath "${BASH_SOURCE[0]}")"
_dir="$(dirname "$_real")"

#
source "${_dir}/math/main.sh"
source "${_dir}/math/util.sh"

source "${_dir}/math/radix.sh"
source "${_dir}/math/size.sh"
source "${_dir}/math/time.sh"

#

