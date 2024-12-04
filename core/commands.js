/**
 * Handles CLI options for the advent of code,
 * resolving the challenge file to execute
 */

const fs = require('node:fs/promises')
const { exec } = require('node:child_process')

const APP_NAME = require('../package.json').name
const { watchError } = require('./tools')
const { formatDay } = require('./utils')
const { getRootDir, setChallengeFolder, getTodayAoCChallenge } = require('./services')

const rootPath = getRootDir(__dirname)
/* -------------------------- CURRENT DATE DETAILS -------------------------- */

const CURRENT_DATE = new Date()
const CURRENT_YEAR = CURRENT_DATE.getFullYear()
const CURRENT_DAY  = formatDay(CURRENT_DATE.getDay() + 1)


/* -------------------------- CURRENT DATE HELPERS -------------------------- */

const getGeneratedDirPath = (year = CURRENT_YEAR) => `${ rootPath }/${ year }`

const getGeneratedPath  = (day = CURRENT_DAY) => `${ getGeneratedDirPath()}/day-${ formatDay( day )}`

const getYearAndDayFromPath = pathToExecute => {
	return pathToExecute 
		.slice(pathToExecute.length - 11)
		.split('/day-')
}


/* -------------------------------------------------------------------------- */
/*                      FILE RESOLUTION BASED ON COMMAND                      */
/* -------------------------------------------------------------------------- */


const getGeneratedPathByDay = argValue => {
	return getGeneratedPath( argValue )
}

const getGeneratedPathByYear = argValue => {
	return `${ getGeneratedDirPath( argValue )}/day-${ CURRENT_DAY }`
}

const getGeneratedPathByDayAndYear = ( argValue ) => {
	const parsedValues = argValue.trim().split(/[-|_|\/]/)
	const year 	= parsedValues[0].length < 4 ? parsedValues[1] : parsedValues[0]
	const day 	= parsedValues[0].length < 4 ? parsedValues[0] : parsedValues[1]
	return `${getGeneratedDirPath( year )}/day-${formatDay( day )}`
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
	const [ yearValue, dayValue ] = getYearAndDayFromPath( generatedPath ).map( Number )

	try {
		const { readmeFile, inputFile } = await setChallengeFolder( generatedPath )

		const { challengeContent, inputContent } = await getTodayAoCChallenge( yearValue, dayValue )
		challengeContent && await fs.writeFile( readmeFile, challengeContent )
		inputContent && await fs.writeFile( inputFile, inputContent )

	} catch( error ){
		console.error( 'Could not add path')
	}
}


const createDirPath = async generatedPath => {
	try {
		await fs.mkdir( generatedPath.slice(0, -7) )
		await addPath( generatedPath )

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
	if( !argValue ) pathToExecute  = getGeneratedPath()
	else if ( argValue.length === 4 ) pathToExecute  = getGeneratedPathByYear( argValue )
	else if ( argValue.length < 4 ) pathToExecute  = getGeneratedPathByDay( argValue )
	else pathToExecute  = getGeneratedPathByDayAndYear( argValue )

	try {
		await fs.access( pathToExecute )
		exec(`node ${ pathToExecute  }`, (err, stdout, stderr) => {
			watchError( err )
			const [ year, day ] = getYearAndDayFromPath( pathToExecute )

			console.info(`\n=============== 📌 Day ${ day } - AoC ${ year } =============== `)
			console.info( stdout )
		})
	} catch( error ) {
		watchError( error )
		console.error( '\nCould not open folder\n\n')
		const [ yearStr, dayStr ] = getYearAndDayFromPath( pathToExecute )

		const shouldAddPath = CURRENT_DAY <= MAX
			&& pathToExecute.includes( CURRENT_YEAR ) 

		const shouldCreateDirPath = dayStr <= MAX
			&& pathToExecute.includes( yearStr ) 

		if( shouldCreateDirPath ){
			createDirPath( pathToExecute )
		}
		
		if( shouldAddPath ){
			console.info('\n🧵 Will create Today\'s challenge folder')
			addPath( pathToExecute )
			const createdFolder = './' + pathToExecute.split( APP_NAME + '/' )[1]
			console.info(`✅ Today\'s challenge folder created!\n   ▶️ 🗂️  ${createdFolder}\n`)
		}
		await executeChallenge()
	}
}


module.exports = {
	executeChallenge
}


