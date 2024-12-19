/**
 * Handles CLI options for the advent of code,
 * resolving the challenge file to execute
 */
const fs = require('node:fs/promises')
const { spawn } = require('node:child_process')

const { watchError } = require('./tools')
const { doesPathExist } = require('./utils')
const { getGeneratedPath, extractYearAndDayFromPath } = require('./helpers')
const { createChallengeFolder } = require('./services')

const { APP_NAME, LOG_SEPARATOR } = require('./constants')
const {
	setupChallengeFolder,
	getTodayAoCChallenge
} = require('./services')


/* -------------------------------------------------------------------------- */
/*                               FILE EXECUTION                               */
/* -------------------------------------------------------------------------- */
const executeChallenge = async () => {
	const argValue 		= process.argv[ 2 ] || null

	// Resolves date
	const challengeFolderPath = getGeneratedPath( argValue )


	const [ year, day ] = extractYearAndDayFromPath( challengeFolderPath )
	const headerMessage = `=============== 📌 Day ${ day } - AoC ${ year } ===============`
	// Executes challenge or Create the challenge folder and its content
	try {
		const isExistingPath = await doesPathExist( challengeFolderPath )

		// Executes the challenge folder
		if( isExistingPath ){
			let spawned = spawn(`node`, [ '--watch', challengeFolderPath + '/index.js'])

			// Gets child's process logs of the executed code
			console.info(`\n${ headerMessage }\n`)
			spawned.stdout.setEncoding('utf-8')
			spawned.stdout.on('data', data => {
				if( !data.includes( challengeFolderPath )){
					console.info( data )
				} else {
					console.info( `${LOG_SEPARATOR}\n` )
				}
			})
		} else {
			console.info('\n📦 Creating the challenge folder...')

			// Create folder day
			await createChallengeFolder( challengeFolderPath )

			// Prepares folders and inner files
			const { readmeFile, inputFile } = await setupChallengeFolder( challengeFolderPath )

			// Get challenge details
			console.info('\n🛜  Fetching today\'s challenge description and data input...')
			const { challengeContent, inputContent } = await getTodayAoCChallenge( year, day )

			// Populate concerned file with challenge details
			challengeContent 	&& await fs.writeFile( readmeFile, challengeContent )
			inputContent 		&& await fs.writeFile( inputFile, inputContent )

			const createdFolder = './' + challengeFolderPath.split( APP_NAME + '/' )[1]
			console.info(`\n✅ Challenge folder created!\n   ▶️ 🗂️  ${createdFolder}`)
			console.info(`\n\n\n\n\n🚀 Running the challenge script...\n   Code ready for changes:\n   ▶️ 🗂️  ${createdFolder}/index.js \n`)
			return await executeChallenge()
		}
	} catch( error ) {
		watchError( error )
	}
}

module.exports = {
	executeChallenge
}