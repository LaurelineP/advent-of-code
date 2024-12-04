 const { getInputData } = require('./services')
 const { logValue } = require('../../core/tools')


const runPartOne = ( leftColumn, rightColumn ) => {
	// Calculates total delta
	let total = 0
	for( let i = 0; i < leftColumn.length; i++ ){
		total += Math.abs(leftColumn[i] - rightColumn[i])
	}
	console.info('\n1. Summed deltas')
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

	console.info('\n2. Total similarities')
	logValue({ totalSimilarities })
}


const runSolutions = async () => {
	try {
		const leftAndRightValues = await getInputData()

		// Sorts both columns
		leftAndRightValues
			.map( sideColumn => sideColumn.sort((a, b) => a - b))

		runPartOne( ...leftAndRightValues )
		runPartTwo( ...leftAndRightValues )

	} catch( error ){
		watchError(error)
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
