
const { readFile } = require('node:fs/promises')
const { useInputPath } = require('../../utils')

const INPUT_FILE = useInputPath( __dirname )

const INCLUDED_DELTAS = [ 1, 2, 3 ]

const isDeltaIncluded = d => INCLUDED_DELTAS.includes(d)

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






const formatInputData = content => {
	if( !content ) return content
	return content
		.split(/\n/)
		.map(row => row.split(/\s+/).map( value => Number( value )))
		
}


const getInputData = async () => {
	try {
		const content = await readFile( INPUT_FILE, 'utf-8' )
		const data = formatInputData( content )
		return data
	} catch ( error ) {
		console.error('Error while getting data')
	}
}



module.exports = {
	getInputData,
	isDeltaIncluded,
	isSaveRow,
	isSaveable
}