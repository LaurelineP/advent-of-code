
const fs 				= require('node:fs/promises')

const { watchError } 	= require('./tools')

const { doesPathExist } = require('./utils')

const {
	sliceYearPathFromPath, 
	getTodayEndpoint,
	getTodayInputEndpoint
} = require('./helpers')

const {
	TEMPLATE_SEPARATOR,
} = require('./constants')

/* -------------------------------------------------------------------------- */
/*                                     AOC                                    */
/* -------------------------------------------------------------------------- */
/** Gets AoC HTML content challenge description in MD */
const getTodayAoCChallenge = async (year, day) => {
	try {
	
		// Gets HTML AoC content
		let response 		= await fetch( getTodayEndpoint( year, day ) )
		let responseText 	= await response.text()

		// Parses the HTML Challenge's content text 
		const contentStartIdx 	= responseText.indexOf('<article')
		const contentEndIdx 	= responseText.indexOf('</article>') + '</article>'.length
		const contentHTML 		= responseText.slice( contentStartIdx, contentEndIdx )

		// Adjusts HTML to MarkDown
		const challengeContent = '# ' + contentHTML
			.replaceAll(/<pre><code>|<\/code><\/pre>/g, '```\n')
			.replaceAll(/<code>|<\/code>/g, '`')
			.replaceAll(/<em>|<\/em>/g, '*')
			.replaceAll(/<\/.+?>/g, '\n')
			.replaceAll(/<.+?>/g, '')


		// Gets AoC input's content ( = challenge's data )
		response = await fetch(
			getTodayInputEndpoint( year, day ),
			{ headers: { 'Cookie': `session=${ process.env.COOKIE }` }
		})
		const inputContent = await response.text()

		return { challengeContent, inputContent }
	} catch( error ){
		watchError( error )
		console.error( error )
	}

}


/* -------------------------------------------------------------------------- */
/*                                 FILE SYSTEM                                */
/* -------------------------------------------------------------------------- */

/** Create folder path recursively ( parents folders if necessary ) */
const createChallengeFolder = async generatedPath => {
	try {
		await fs.mkdir( generatedPath, { recursive: true } )
	} catch( error ){
		console.error( 'Could not create dir path')
		console.error( error )
	}
}
/* -------------------------------------------------------------------------- */
/*                            PROJECT ORGANIZATIONS                           */
/* -------------------------------------------------------------------------- */

/** Get's local template.txt and parses it to return contents:
	@returns string | undefined
 */
const getTemplateContents = async () => {

	const TEMPLATES_PATH = `${ __dirname }/templates.txt`

	try {
		let contents = await fs.readFile( TEMPLATES_PATH, 'utf-8' )
			contents = contents.split(TEMPLATE_SEPARATOR).reduce((acc, _content) => {
			const fileDestination = _content
				.match(/\/\/\s*(.+?)\.js/)[0]
				.replaceAll(/\/|\s|\.js/g, '')

				acc[ fileDestination ] = _content.replace(/\/\/\s*(.+?)\.js/, '').trim()
				return acc
		}, {})
		return contents
	} catch( error ){
		watchError( error )
	}
}
/**
 * Creates all necessary folders / files to be ready to start developing
 *  - folder for x year if necessary
 * 	- folder for x day if necessary
 *  - file index.js
 *  - file README.md
 */
const setupChallengeFolder = async folderDayPath => {
	const folderYearPath = sliceYearPathFromPath( folderDayPath )

	const day = folderDayPath.slice( -2 )

	try {
		const doesExist = await doesPathExist( folderYearPath )
		if( doesExist ){
		
			let { index, services } = await getTemplateContents()
			index = `console.info('TODO: Day ${ day }')\n${index}`
			
			await fs.writeFile(`${ folderDayPath }/index.js`, index )
			await fs.writeFile(`${ folderDayPath }/services.js`, services )
			await fs.writeFile(`${ folderDayPath }/README.md`, '')
			await fs.writeFile(`${ folderDayPath }/input.txt`, '')
		}
	} catch( error ){
		watchError( error.message )
		console.error( error )
	}
	return {
		folderDay	: folderDayPath,
		readmeFile	: `${ folderDayPath }/README.md`,
		jsFile		: `${ folderDayPath }/index.js`,
		inputFile	: `${ folderDayPath }/input.txt`
	}
}



module.exports = {
	createChallengeFolder,
	getTodayAoCChallenge,
	setupChallengeFolder
}