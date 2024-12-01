 const INPUT_FILE = `${__dirname}/input.txt`
 const { delimitLeftFromRight } = require('./services')
 const { logValue } = require('../../core/tools')


const runPartOne = async () => {
	try {
		const leftAndRightValues = await delimitLeftFromRight( INPUT_FILE )
		
		// Sorts both columns
		const [ leftColumn, rightColumn ] = leftAndRightValues
			.map( sideColumn => sideColumn.sort((a, b) => a - b))


		// Calculates total delta
		let total = 0
		for( let i = 0; i < leftColumn.length; i++ ){
			total += Math.abs(leftColumn[i] - rightColumn[i])
		}

		logValue({ total })
	} catch( error ){
		console.error(error.message)
		console.error(error)
	}
	/** Returns
		=============== 📌 Day 01 - AoC 2024 =============== 
		┌─────────┬─────────┐
		│ (index) │  total  │
		├─────────┼─────────┤
		│  value  │ 1580061 │
		└─────────┴─────────┘
	 */
}
runPartOne()
