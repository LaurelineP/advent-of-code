import { readFile } from 'node:fs/promises'
import { useInputPath } from '../../utils'

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


export {
	getInputData,
}