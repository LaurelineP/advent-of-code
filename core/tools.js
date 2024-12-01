/** Logs helper - for a given value, log display a table  */
exports.logValue = value => {
	let logger = console.table
	if(
		value instanceof Object
		&& Object
			.values(value)
			.some(v => v instanceof Object)
	){
		logger = console.info
	}
	logger({ value })
	return value
}

/** Error callback logger - logs error or logs No Error Feedback */
exports.watchError = (err, isSilenced = false) => {
	if(err) {
		console.error('\n❌ [ CAUGHT ERROR ]\n', err.message )
		return err
	}
	!isSilenced && console.info('\nError Feedback: No Error - Operation was successful! Please Proceed.')
}

/** Success callback logger - logs and returns data */
exports.watchData = data => {
	if(data){
		this.logValue({ data })
		return data
	}
	return
}
