/**
 * Handles CLI options for the advent of code,
 * resolving the challenge file to execute
 */
import  fs  from "node:fs/promises"
import { spawn } from "node:child_process"

import { watchError } from './tools'
import { doesPathExist } from './utils'
import { getGeneratedPath, extractYearAndDayFromPath } from './helpers'
import { createChallengeFolder } from './services'

import { APP_NAME, LOG_SEPARATOR } from './constants'
import {
	setupChallengeFolder,
	getTodayAoCChallenge
} from './services'


/* -------------------------------------------------------------------------- */
/*                               FILE EXECUTION                               */
/* -------------------------------------------------------------------------- */
export const executeChallenge = async () => {
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
			let spawned = spawn(`bun`, [ 'run', '--watch', '--no-cache', challengeFolderPath + '/index.ts'])


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


			// Added stderr listener to capture error output
			spawned.stderr.setEncoding('utf-8')
			spawned.stderr.on('data', data => {
				console.error('stderr:', data)
			})
		}
		// Build and generate the challenge folder
		else {
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
			console.info(`\n\n\n\n\n🚀 Running the challenge script...\n   Code ready for changes:\n   ▶️ 🗂️  ${createdFolder}/index.ts \n`)
			const result = await executeChallenge()
			return result;
		}
	} catch( error ) {
		watchError( error )
	}
}