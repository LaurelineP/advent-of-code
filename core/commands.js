/**
 * Handles CLI options for the advent of code,
 * resolving the challenge file to execute
 */

const fs = require('node:fs/promises')
const path = require('node:path')
const { exec } = require('node:child_process')

const { watchError } = require('./tools')
const { formatDay, doesPathExist } = require('./utils')
const { getGeneratedPath, extractYearAndDayFromPath } = require('./helpers')
const { createYearFolder } = require('./services')

const {
	APP_NAME,
	CURRENT_DAY
} = require('./constants')
const {
	setupChallengeFolder,
	getTodayAoCChallenge
} = require('./services')
const { exit, kill } = require('node:process')


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
			console.info('\n🧵 Creating the challenge folder...')

		
			// Create folder day
			await createYearFolder( challengeFolderPath )

			// Creates folder day inner files
			const [ year, day ] = extractYearAndDayFromPath( challengeFolderPath )
			const { readmeFile, inputFile } = await setupChallengeFolder( challengeFolderPath )

			// Get challenge details
			const { challengeContent, inputContent } = await getTodayAoCChallenge( year, day )

			// Populate concerned file with challenge details
			challengeContent 	&& await fs.writeFile( readmeFile, challengeContent )
			inputContent 		&& await fs.writeFile( inputFile, inputContent )

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