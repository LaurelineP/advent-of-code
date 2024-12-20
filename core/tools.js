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
exports.watchError = (err, isSilenced) => {
	if(err) {
		let message = '\n❌ [ ERROR CAUGHT ]:';
		console.error( message, err.message )
		return err
	}
	!isSilenced && console.info('\nGood to Proceed!')
}

/** Success callback logger - logs and returns data */
exports.watchData = data => {
	if(data){
		this.logValue({ data })
		return data
	}
	return
}
