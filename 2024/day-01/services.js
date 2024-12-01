const { readFile } = require('node:fs/promises')


async function delimitLeftFromRight ( file ){
	try {
		const content = await readFile( file, 'utf-8' )
		const linesSplitted = content
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
		return linesSplitted

	} catch (error) {
		console.error('A problem occurred')
		console.error(error.message)
	}
}




module.exports = {
	delimitLeftFromRight
}