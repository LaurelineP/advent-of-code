 import { getInputData } from './services'
 import { logValue, watchError } from '../../core/tools'

const runPartOne = ( leftColumnEntries: number[], rightColumnEntries: number[] ) => {
	// Calculates total delta
	let total = 0
	for( let i = 0; i < leftColumnEntries.length; i++ ){
		const a = leftColumnEntries[i] || 0
		const b = rightColumnEntries[i] || 0
		total += Math.abs(a - b)
	}
	console.info('\n1. Summed deltas')
	logValue({ total })
}


const runPartTwo = ( leftColumnEntries: number[], rightColumnEntries: number[] ) => {
	let totalSimilarities = 0
	const rightColumnString = rightColumnEntries.join(' ');
	for( let leftValue of leftColumnEntries ){
		const pattern = new RegExp(`${leftValue}`, 'g')
		const count = rightColumnString.match(pattern)?.length
		count && (totalSimilarities += count * leftValue)
	}

	console.info('\n2. Total similarities')
	logValue({ totalSimilarities })
}


const runSolutions = async () => {
	try {
		let leftAndRightValues = await getInputData()
		if (!leftAndRightValues?.[0].length || !leftAndRightValues?.[1].length ){
			throw new Error( '[ RUN CURRENT DAY ] Values are un-reachable')
		}
		// Sorts both columns
		leftAndRightValues = leftAndRightValues.map((sideColumn: number[]) =>
			sideColumn.sort((a, b) => a - b)
		) as [number[], number[]];
		
		runPartOne( ...leftAndRightValues )
		runPartTwo( ...leftAndRightValues )

	} catch( error ){
		watchError(error as Error)
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
