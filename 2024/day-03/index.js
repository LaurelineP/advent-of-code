const { getInputData, handleData } = require('./services')
const { logValue } = require('../../core/tools')


const getCtxName = args => args.callee.name
const runPartOne = function( data ) {
	console.info('\n1. Eval multiplications & Summed result')

	const thisCtx = getCtxName(arguments) // => name = runPartOne
	let result = handleData(data, thisCtx)
	if( !result ){
		console.warn('Couldn\'t compute a result')
	}
	logValue({ result })

}

const runPartTwo = function (data) {
	// WIP
	console.info('\n2. Eval and Summed filtered out `don\'t()` remaining values')
	
	const thisCtx = getCtxName(arguments) // => name = runPartTwo
	const result = handleData(data, thisCtx)
	if( !result ){
		console.warn('Couldn\'t compute a result')
		return
	}


	logValue({ result })

}

const runSolutions = async () => {
	const data = await getInputData()
	const fakeData = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
	runPartOne(data)
	runPartTwo(data)
	/**
		
		1. Eval multiplications & Summed result
		┌─────────┬───────────┐
		│ (index) │  result   │
		├─────────┼───────────┤
		│  value  │ 179571322 │
		└─────────┴───────────┘
	 */
}
runSolutions()
