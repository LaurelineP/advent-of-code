
const { readFile } = require('node:fs/promises')
const { useInputPath } = require('../../utils')

const INPUT_FILE = useInputPath( __dirname )

const INCLUDED_DELTAS = [ 1, 2, 3 ]

const isDeltaIncluded = d => INCLUDED_DELTAS.includes(d)


const formatInputData = content => {
	if( !content ) return content
	return content
		.split(/\n/)
		.map(row => row.split(/\s+/).map( value => Number( value )))
		
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
	isDeltaIncluded
}