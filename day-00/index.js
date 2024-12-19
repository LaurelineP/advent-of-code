console.info('TODO: Day 00')
const { getInputData } = require('./services')
const { logValue } = require('../../core/tools')

const runPartOne = data => {
	console.info('\n1. <Result>')

}

const runPartTwo = data => {
	console.info('\n2. <Result>')

}

const runSolutions = async () => {
	const data = await getInputData()
	runPartOne(data)
	// runPartTwo()
}
runSolutions()