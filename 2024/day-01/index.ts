 import { getInputData } from './services'
 import { logValue } from '../../core/tools'

const runPartOne = ( leftColumnEntries: [number|string], rightColumnEntries: [number|string] ) => {
	console.log("run one")
	console.log('leftColumnEntries:', leftColumnEntries[0], typeof leftColumnEntries[0] )
	// Calculates total delta
	let total = 0
	for( let i = 0; i < leftColumnEntries.length; i++ ){
		total += Math.abs(leftColumnEntries[i] - rightColumnEntries[i])
	}
	console.info('\n1. Summed deltas')
	logValue({ total })
}


const runPartTwo = ( leftColumnEntries: number[], rightColumnEntries: [number|string] ) => {
	let totalSimilarities = 0
	const rightColumnString = rightColumnEntries.join(' ');
	for( let leftValue of leftColumnEntries ){
		const pattern = new RegExp(leftValue, 'g')
		const count = rightColumnString.match(pattern)?.length
		count && (totalSimilarities += count * leftValue)
	}

	console.info('\n2. Total similarities')
	logValue({ totalSimilarities })
}


const runSolutions = async () => {
	try {
		let leftAndRightValues = await getInputData()


		// Sorts both columns
		leftAndRightValues = leftAndRightValues
			.map( (sideColumn: number[]) => sideColumn.sort((a, b) => a - b) as [number|string])
		
		runPartOne( ...leftAndRightValues )
		runPartTwo( ...leftAndRightValues )

	} catch( error ){
		watchError(error)
		console.error(error)
	}
	// return "BLA"
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
await runSolutions()
