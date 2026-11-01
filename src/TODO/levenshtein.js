/*
* Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
* https://kekse.biz/ https://github.com/kekse1/levenshtein.js/
* v2.0.0
*/

//
const DEFAULT_CASE_SENSITIVE = false;
const DEFAULT_WITH_DISTANCES = true;
const DEFAULT_DISTANCE = 'matrix';

//
const levenshtein = (_word, ... _compare) => {
	var caseSensitive = DEFAULT_CASE_SENSITIVE; var withDistances = DEFAULT_WITH_DISTANCES;
	if(typeof _word !== 'string') throw new Error('Invalid _word argument (not a String)');
	for(var i = 0; i < _compare.length; ++i) if(typeof _compare[i] === 'boolean') caseSensitive = _compare.splice(i--, 1)[0];
		else if(_compare[i] === null) { withDistances = !withDistances; _compare.splice(i--, 1); }
		else if(typeof _compare[i] !== 'string') _compare.splice(i--, 1);
	if(_compare.length === 0) return []; _compare = [ ... new Set(_compare) ];
	const result = new Array(_compare.length); for(var i = 0; i < _compare.length; ++i)
		if(_word.length === 0) result[i] = [ _compare[i], _compare[i].length ];
		else result[i] = [ _compare[i], levenshtein.distance(_word, _compare[i], caseSensitive) ];
	result.sort((_a, _b) => (_a[1] - _b[1])); if(!withDistances) for(var i = 0; i < result.length; ++i)
		result[i] = result[i][0]; return result; };

levenshtein.distance = (_a, _b, _case_sensitive = DEFAULT_CASE_SENSITIVE, _algorithm = DEFAULT_DISTANCE) => {
	if(typeof _a !== 'string' || typeof _b !== 'string')
		throw new Error('Invalid argument(s) (not String(s))');
	else if(!_case_sensitive) { _a = _a.toLowerCase(); _b = _b.toLowerCase(); }
	if(_a.length === 0) return _b.length;
	else if(_b.length === 0) return _a.length;
	else if(typeof levenshtein.distance[_algorithm] !== 'function')
		throw new Error('Invalid _algorithm argument (no such distance function)');
	return levenshtein.distance[_algorithm](_a, _b); };

levenshtein.distance.matrix = (_a, _b) => {
	if(_a.length === 0) return _b.length; else if(_b.length === 0) return _a.length;
	const matrix = []; var i; for(i = 0; i <= _b.length; ++i) matrix[i] = [i];
		var j; for(j = 0; j <= _a.length; ++j) matrix[0][j] = j;
	for(i = 1; i <= _b.length; ++i) { for(j = 1; j <= _a.length; ++j) {
		if(_b[i - 1] === _a[j - 1])
			matrix[i][j] = matrix[i - 1][j - 1];
		else
			matrix[i][j] = Math.min(
				matrix[i - 1][j - 1] + 1,
				Math.min(matrix[i][j - 1] + 1,
					matrix[i - 1][j] + 1)); }}
	return matrix[_b.length][_a.length]; };

levenshtein.distance.vector = (_a, _b) => { throw new Error('TODO'); };

//
export default levenshtein;

//

