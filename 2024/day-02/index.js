const { getInputData, isDeltaIncluded } = require('./services')
const { logValue, watchError } = require('../../core/tools')


let edgeCases = []
let totalSaved = 0
const getRowOrder = row => {
	const rowOrderRef = row.toString()
	const rowOrderInc = [...row].sort((a,b) => a - b).toString()
	const rowOrderDec = [...row].sort((a,b) => b - a).toString()

	return rowOrderRef === rowOrderInc ? 'inc'
		: rowOrderRef === rowOrderDec ? 'dec'
		: 'unordered'
}


// Checks (report) if "safe" ( delta being between 1 - 3 for following row's value )
const isSaveRow = row => {
	const _isSaveRow = row.every(( value, idx ) => {
		const prev = row[idx - 1]
		const next = row[idx + 1]
	
		const hasNext = !isNaN( next )

		/* ----------------------------- BASIC SAFE ROW ----------------------------- */
		// Controller of delta value based on order
		const orderController = {
			inc: hasNext ? (next - value) : (value - prev),
			dec: hasNext ? (value - next) : (prev - value),
		}

		// Handles row's value order - check if values are following sequence
		const order = getRowOrder( row )
		const delta = orderController[ order ] || null

		return !!delta && isDeltaIncluded( delta )
	})
	return _isSaveRow
}


const isSaveable = row => {
	const isNotEligible = row.length < 2
	if(isNotEligible) return false

	// Found value -> indicates the row is safe without that value
	const saveableRow = row.find((_, idx) => {
		const temp = [...row].toSpliced(idx, 1)
		const isSafeRowCandidate = isSaveRow(temp)
		return isSafeRowCandidate
	})
	
	return !!saveableRow
}


const runPartOne = data => {
	try {
		const areSafeRows 	= data.map( isSaveRow )
		const savedCount 	= areSafeRows.filter( Boolean ).length
		totalSaved += savedCount

		edgeCases 			= data.filter(( _, idx  ) => !areSafeRows[idx])

		console.info('\n1. Safe reports count')
		logValue({ savedCount })

	} catch( error ) {
		console.error( 'Part One failed')
		console.error( error )
	}
}

const runPartTwo = data => {
	console.info('\n2. Count with extra safe reports')
	const extraSaved = data.filter( isSaveable )
	logValue({ savedCount: totalSaved + extraSaved.length })
}


const runSolutions = async () => {
	try {
		const data = await getInputData()
		runPartOne(data)
		runPartTwo(edgeCases)
	} catch ( error ){
		watchError(error.message)
		console.error(error)
	}
	/**
			=============== 📌 Day 02 - AoC 2024 =============== 

			1. Safe reports count
			┌─────────┬────────────┐
			│ (index) │ savedCount │
			├─────────┼────────────┤
			│  value  │    306     │
			└─────────┴────────────┘

			2. Count with extra safe reports
			┌─────────┬────────────┐
			│ (index) │ savedCount │
			├─────────┼────────────┤
			│  value  │    366     │
			└─────────┴────────────┘
		*/
}

runSolutions()
