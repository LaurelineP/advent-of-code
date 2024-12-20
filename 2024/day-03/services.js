const { readFile } = require('node:fs/promises')

const {
	INPUT_FILE,
	MULTIPLY_PATTERN,
	DONT_MULTIPLY_PATTERN,
} = require('./constants')

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */
/** Gets all matched value at position 0 from returned match */
const getMatchAllValue = matchAllResult => matchAllResult[ 0 ]

/** Format number string to number typed  */
const formatItemValuesToNumber = itemValuesStr => {
	return [ ...itemValuesStr.matchAll(/\d+/g) ]
		.map(
			getMatchAllValue.bind.call(Number)
		)
}

/** Parses string to get specific multiply operation => e.g.: mul(<n,><n>) */
const parseMultiplyPattern = data => {
	return [ ...data.matchAll( MULTIPLY_PATTERN )]
}

/** Reduce callback summing all resulted outputs  */
const reduceToSum = (total, values) => total += Math.imul(...values)


/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

/** [ First case computation ] - all multiplication operations */
const parseAndSumPartOne = data => {
	return parseMultiplyPattern(data)

			// gets match group value at index 0
			.map( getMatchAllValue )

			// gets value string's numbers values as tuple
			.map( formatItemValuesToNumber )

			// multiplies tuples of numbers together
			.map( numbers => Math.imul( ...numbers ))

			// sums values
			.reduce(( total, value ) => total += value, 0)

}


/** [ Second case computation ] - only enabled multiplication operations */
// TODO: Invalid result to fix
const parseAndSumPartTwo = (data) => {
	// initially had 63 results
	return data.split( DONT_MULTIPLY_PATTERN )
		.flatMap(( x, idx )=> {
			return idx === 0
			// any beginning with closing "do()" or "don't()"
			? [...x.matchAll(/.+?do(n't)?\(\)/g)] 

			// any contains between "do()" or "don't()" wrapper
			: [...x.matchAll(/do\(\).+?do\(\)/g)] 
			
		}).map(  getMatchAllValue )

		// gets nested values
		.flatMap( parseMultiplyPattern )
		
		.map( getMatchAllValue )

		// gets and formats number string values 
		.map( formatItemValuesToNumber )

		// factor and sum factored value
		.reduce(reduceToSum, 0)

}

/** Controls code flow for each case  */
const dataHandlerController = {
	one: parseAndSumPartOne,
	two: parseAndSumPartTwo
}

/* -------------------------------------------------------------------------- */
/*                                    MAINS                                   */
/* -------------------------------------------------------------------------- */
/**
 * Formats input data depending on part 1 or part 2 needs
 * fnFormatItemOption part 1 => gets `mul(<n>,<n>)`
 * fnFormatItemOption part 2 => 
 * 		- gets `do()...mul(<n>,<n>),
 * 		- gets `don't()...mul(<n>,<n>)`
 * 		- gets other `...mul(<n></n>)`
 * finally (both parts) --> gets all within numbers as tuples of number typed value
 * @param {*} data 
 * @param {*} fnFormatOption 
 * @returns 
 */
const handleData = ( data, ctxName ) => {

	const part = ctxName.match(/one|two/i)?.[0]?.toLowerCase()
	return dataHandlerController?.[ part ]?.( data )
}

const getInputData = async () => {
	try {
		const data = await readFile( INPUT_FILE, 'utf-8' )
		return data
	} catch ( error ) {
		console.error('Error while getting data')
	}
}


module.exports = {
	getInputData,
	getMatchAllValue,
	handleData,
	formatItemValuesToNumber
}