const { readFile } = require('node:fs/promises')
const { useInputPath } = require('../../utils')

const INPUT_FILE = useInputPath( __dirname )

const formatInputData = data => {
	return data
}

const getInputData = async () => {
	try {
		const content = await readFile( INPUT_FILE, 'utf-8' )
		const data = formatInputData( content )
		return data
	} catch ( error ) {
		console.error('Error while getting data')
	}
}


module.exports = {
	getInputData,
}