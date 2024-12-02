
const formatDay = (value) => Number(value) > 9
	? Number(value)
	: `${ Number(value) }`.padStart(2,'0')

module.exports = {
	formatDay
}