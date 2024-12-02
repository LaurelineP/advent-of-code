const { readFile } = require('node:fs/promises');
const { useInputPath } = require('../../utils');

 const INPUT_FILE = useInputPath(__dirname)


const formatInputData = data => {
	const splittedLines = data
		// 1. gets lines
		.split(/\n/g)

		// 2. gets and format values per lines
		.map(lineStr => lineStr
			.split(/\s+/)
			.map( Number)
		)

		// 3. gets 2 arrays from left values and right values
		.reduce(( acc, [colVal1, colVal2 ]) => {
			acc[0].push( colVal1 );
			acc[1].push( colVal2 );
			return acc;
		}, [[], []])
	return splittedLines
}
async function getInputData (){
	try {
		const content = await readFile( INPUT_FILE, 'utf-8' )
		const dataFormatted = formatInputData( content )
		return dataFormatted

	} catch (error) {
		console.error('A problem occurred')
		console.error(error.message)
	}
}



module.exports = {
	getInputData
}