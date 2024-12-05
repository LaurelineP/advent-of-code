/**
 * Handles CLI options for the advent of code,
 * resolving the challenge file to execute
 */

const fs = require('node:fs/promises')
const path = require('node:path')
const { exec } = require('node:child_process')

const { watchError } = require('./tools')
const { formatDay, doesPathExist } = require('./utils')
const { getGeneratedPath, extractYearAndDayFromPath, sliceYearPathFromPath } = require('./helpers')
const { createYearFolder } = require('./services')

const {
	APP_NAME,
	CURRENT_YEAR,
	CURRENT_DAY
} = require('./constants')
const {
	setupChallengeFolder,
	getTodayAoCChallenge
} = require('./services')
const { exit, kill } = require('node:process')



/* --------------------------- FILE SYSTEM HELPERS -------------------------- */


/* -------------------------------------------------------------------------- */
/*                      FILE RESOLUTION BASED ON COMMAND                      */
/* -------------------------------------------------------------------------- */

/**  Generates folder YYYY/day-DD path string  */
const getGeneratedPathByDayInput = argValue => {
	return getGeneratedPath( argValue )
}

/**  Generates folder YYYY/day-DD */
const getGeneratedPathByYearInput = argValue => {
	return `${ getGeneratedDirPath( argValue )}/day-${ CURRENT_DAY }`
}

const getGeneratedPathByDayAndYear = ( argValue ) => {
	const parsedValues = argValue.trim().split(/[-|_|\/]/)
	const year 	= parsedValues[0].length < 4 ? parsedValues[1] : parsedValues[0]
	const day 	= parsedValues[0].length < 4 ? parsedValues[0] : parsedValues[1]
	return `${getGeneratedDirPath( year )}/day-${ formatDay( day )}`
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
	const [ yearValue, dayValue ] = extractYearAndDayFromPath( generatedPath ).map( Number )

	try {
		const { readmeFile, inputFile } = await setupChallengeFolder( generatedPath )

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
	const argValue 		= process.argv[ 2 ] || null
	const challengeFolderPath = getGeneratedPath( argValue )

	// Executes challenge or Create the challenge folder and its content
	try {
		const isExistingPath = await doesPathExist( challengeFolderPath )

		// Executes challenge
		if( isExistingPath ){
			exec(`node ${ challengeFolderPath  }`,async (err, stdout, stderr) => {
				const [ year, day ] = extractYearAndDayFromPath( challengeFolderPath )
				
				if( stderr || err ){

					watchError(new Error('Missing file(s)content'))
					const relativeChallengeFolderPath = path.relative(__dirname, challengeFolderPath).slice(1)
					console.error('🗑️  Removing folder...')

					await fs.rm( challengeFolderPath, { recursive: true } )
					console.error('✅ Folder removed!\n \ ▶️ 🗂️ ', relativeChallengeFolderPath, '\n')

					return exit(1)
				}

				console.info(`\n=============== 📌 Day ${ day } - AoC ${ year } =============== `)
				console.info( stdout )
			})
		} else {
			// Create folder and its content
			console.info('\n🧵 Creating the challenge folder...')

			await createYearFolder( challengeFolderPath )
			await setupChallengeFolder( challengeFolderPath )

			const createdFolder = './' + challengeFolderPath.split( APP_NAME + '/' )[1]
			console.info(`✅ Challenge folder created!\n   ▶️ 🗂️  ${createdFolder}\n`)
		}
	} catch( error ) {
		watchError( error )
	}
}


module.exports = {
	executeChallenge
}


