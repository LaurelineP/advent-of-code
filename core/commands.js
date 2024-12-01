/**
 * Handles CLI option for the advent of code,
 * resolving the challenge file to execute
 */

const fs = require('node:fs/promises')
const path = require('node:path')
const { exec } = require('node:child_process')
const { watchError } = require('./tools')

const rootPath = path.resolve(__dirname, '..')

/* -------------------------- CURRENT DATE DETAILS -------------------------- */
const formatDay = (value) => Number(value) > 9
	? Number(value)
	: `${ Number(value) }`.padStart(2,'0')

const _date = new Date()
const _year = _date.getFullYear()
const _day  = formatDay(_date.getDay() + 1)


/* -------------------------- CURRENT DATE HELPERS -------------------------- */

const getDirPath = (year = _year) => `${ rootPath }/${ year }`
const getFilePath  = (day = _day) => `${ getDirPath()}/day-${ formatDay( day )}`
// TODO -> resolve challenge according to date



/* -------------------------------------------------------------------------- */
/*                      FILE RESOLUTION BASED ON COMMAND                      */
/* -------------------------------------------------------------------------- */


const getChallengePathByDay = ( argValue ) => {
	return getFilePath(argValue)
}

const getChallengePathByYear = ( argValue ) => {
	return `${ getDirPath( argValue )}/day-${ _day }`
}

const getChallengePathByDayAndYear = ( argValue ) => {
	const parsedValues = argValue.trim().split(/[-|_|\/]/)
	const year 	= parsedValues[0].length < 4 ? parsedValues[1] : parsedValues[0]
	const day 	= parsedValues[0].length < 4 ? parsedValues[0] : parsedValues[1]
	return `${getDirPath( year )}/day-${formatDay( day )}`
}


/* -------------------------------------------------------------------------- */
/*                               FILE EXECUTION                               */
/* -------------------------------------------------------------------------- */
const executeChallenge = async () => {
	const argValue = process.argv[2] || null
	let challengePathToExecute;

	if( !argValue ) challengePathToExecute = getFilePath()
	else if ( argValue.length === 4 ) challengePathToExecute = getChallengePathByYear( argValue )
	else if ( argValue.length < 4 ) challengePathToExecute = getChallengePathByDay( argValue )
	else challengePathToExecute = getChallengePathByDayAndYear( argValue )

	try {
		await fs.access( challengePathToExecute )
		exec(`node ${ challengePathToExecute }`, (err, stdout, stderr) => {
			watchError(err, true)
			const [ year, day ] = challengePathToExecute
				.slice(challengePathToExecute.length - 11)
				.split('/day-')

			console.info(`\n=============== 📌 Day ${ day } - AoC ${ year } =============== `)
			console.info( stdout )
		})
	} catch( error ) {
		watchError(error)
	}
}


module.exports = {
	executeChallenge
}


