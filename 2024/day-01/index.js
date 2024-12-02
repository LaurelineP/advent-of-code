 const INPUT_FILE = `${__dirname}/input.txt`
 const { delimitLeftFromRight } = require('./services')
 const { logValue } = require('../../core/tools')


const runPartOne = ( leftColumn, rightColumn ) => {

	// Calculates total delta
	let total = 0
	for( let i = 0; i < leftColumn.length; i++ ){
		total += Math.abs(leftColumn[i] - rightColumn[i])
	}
	console.info('1. Summed deltas')
	logValue({ total })
}


const runPartTwo = ( leftColumn, rightColumn ) => {
	let totalSimilarities = 0
	const rightColumnString = rightColumn.join(' ');
	for( let leftValue of leftColumn ){
		const pattern = new RegExp(leftValue, 'g')
		const count = rightColumnString.match(pattern)?.length
		count && (totalSimilarities += count * leftValue)
	}

	console.info('2. Total similarities')
	logValue({ totalSimilarities })
}


const runSolutions = async () => {
	try {
		const leftAndRightValues = await delimitLeftFromRight( INPUT_FILE )
		

		// Sorts both columns
		const [ leftColumn, rightColumn ] = leftAndRightValues
			.map( sideColumn => sideColumn.sort((a, b) => a - b))

		
		runPartOne( ...leftAndRightValues )
		runPartTwo( ...leftAndRightValues )


	} catch( error ){
		console.error(error.message)
		console.error(error)
	}
	/** Returns
		=============== 📌 Day 01 - AoC 2024 =============== 
		1. Summed deltas
		┌─────────┬─────────┐
		│ (index) │  total  │
		├─────────┼─────────┤
		│  value  │ 1580061 │
		└─────────┴─────────┘
		2. Total similarities
		┌─────────┬───────────────────┐
		│ (index) │ totalSimilarities │
		├─────────┼───────────────────┤
		│  value  │     23046913      │
		└─────────┴───────────────────┘
	 */
}
runSolutions()
