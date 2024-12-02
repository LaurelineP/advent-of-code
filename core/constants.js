
/* -------------------------------------------------------------------------- */
/*                               ADVENT OF CODE                               */
/* -------------------------------------------------------------------------- */
const AOC_URL = `https://adventofcode.com`

/** Advent Of Code - Current day challenge endpoint
	- Output: AOC_URL/YYYY/day/DD
 */
const getTodayEndpoint = (year, day) => `${ AOC_URL}/${ year }/day/${ day }`

const getTodayInput = (year, day) => getTodayEndpoint(year, day) + '/input'


module.exports = {
	getTodayEndpoint,
	getTodayInput
}