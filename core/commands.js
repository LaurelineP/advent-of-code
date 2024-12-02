/**
 * Handles CLI option for the advent of code,
 * resolving the challenge file to execute
 */

const fs = require('node:fs/promises')
const path = require('node:path')
const { exec } = require('node:child_process')

const APP_NAME = require('../package.json').name
const { watchError } = require('./tools')
const { formatDay } = require('./utils')
const { getRootDir, setChallengeFolder, getTodayAoCChallenge } = require('./services')

const rootPath = getRootDir(__dirname)
/* -------------------------- CURRENT DATE DETAILS -------------------------- */

const _date = new Date()
const _year = _date.getFullYear()
const _day  = formatDay(_date.getDay() + 1)


/* -------------------------- CURRENT DATE HELPERS -------------------------- */

const getDirPath = (year = _year) => `${ rootPath }/${ year }`
const getPath  = (day = _day) => `${ getDirPath()}/day-${ formatDay( day )}`




/* -------------------------------------------------------------------------- */
/*                      FILE RESOLUTION BASED ON COMMAND                      */
/* -------------------------------------------------------------------------- */


const getPathByDay = ( argValue ) => {
	return getPath(argValue)
}

const getPathByYear = ( argValue ) => {
	return `${ getDirPath( argValue )}/day-${ _day }`
}

const getPathByDayAndYear = ( argValue ) => {
	const parsedValues = argValue.trim().split(/[-|_|\/]/)
	const year 	= parsedValues[0].length < 4 ? parsedValues[1] : parsedValues[0]
	const day 	= parsedValues[0].length < 4 ? parsedValues[0] : parsedValues[1]
	return `${getDirPath( year )}/day-${formatDay( day )}`
}

/* -------------------------------------------------------------------------- */
/*                    AUTO GENERATE FOLDER FOR DEDUCTED DAY                   */
/* -------------------------------------------------------------------------- */
const MAX = 25
/**
 * Create folder challenge for current new day
 * @param {*} generatedPath 
 */
const addPath = async generatedPath => {
	const yearValue = Number(generatedPath.split('/').at(-2))
	const dayValue 	= Number(generatedPath.slice(-2))

	// TODO: exception on day being > MAX ( 25 )
	try {
		const { readmeFile, inputFile } = await setChallengeFolder( generatedPath )
		const { challengeContent, inputContent } = await getTodayAoCChallenge( yearValue, dayValue )
		challengeContent && await fs.writeFile( readmeFile, challengeContent )
		inputContent && await fs.writeFile( inputFile, inputContent )

	} catch( error ){

		console.error( 'Could not add path')
	}
}



/* -------------------------------------------------------------------------- */
/*                               FILE EXECUTION                               */
/* -------------------------------------------------------------------------- */
const executeChallenge = async () => {
	const argValue = process.argv[2] || null
	let pathToExecute ;

	// Deducts path based on command arguments
	if( !argValue ) pathToExecute  = getPath()
	else if ( argValue.length === 4 ) pathToExecute  = getPathByYear( argValue )
	else if ( argValue.length < 4 ) pathToExecute  = getPathByDay( argValue )
	else pathToExecute  = getPathByDayAndYear( argValue )

	try {
		await fs.access( pathToExecute  )
		exec(`node ${ pathToExecute  }`, (err, stdout, stderr) => {
			watchError(err)
			const [ year, day ] = pathToExecute 
				.slice(pathToExecute .length - 11)
				.split('/day-')

			console.info(`\n=============== 📌 Day ${ day } - AoC ${ year } =============== `)
			console.info( stdout )
		})
	} catch( error ) {
		watchError(error)
		const shouldAddPath = Number(pathToExecute.slice(-2)) <= 25
			&& pathToExecute.includes(_year)
		if( shouldAddPath ){
			console.info('\n🧵 Will create today\'s challenge folder')
			addPath( pathToExecute )
			const createdFolder = './' + pathToExecute.split(APP_NAME + '/')[1]
			console.info(`✅ Today\'s challenge folder created!\n   ▶️ 🗂️  ${createdFolder}\n`)
		}
	}
}


module.exports = {
	executeChallenge
}


