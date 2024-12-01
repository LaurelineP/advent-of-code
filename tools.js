/** Logs helper - for a given value, log display a table  */
const logValue = (value) => {
	let logger = console.table
	if(
		value instanceof Object
		&& Object
			.values(value)
			.some(v => v instanceof Object)
	){
		logger = console.log
	}
	logger({ value })
	return value
}


module.exports = {
	logValue
}