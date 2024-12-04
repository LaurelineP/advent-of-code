
const fs 				= require('node:fs/promises')
const path 				= require('node:path')
const { getTodayEndpoint, getTodayInput } 	= require('./constants')
const { watchError } = require('./tools')


/* -------------------------------------------------------------------------- */
/*                                     AOC                                    */
/* -------------------------------------------------------------------------- */
/** Gets AoC HTML content challenge description in MD */
const getTodayAoCChallenge = async (year, day) => {
	try {
	
		// Gets HTML AoC content
		let response 		= await fetch( getTodayEndpoint( year, day ) )
		let responseText 	= await response.text()

		// Parse HTML Challenge Text 
		const contentStartIdx 	= responseText.indexOf('<article')
		const contentEndIdx 	= responseText.indexOf('</article>') + '</article>'.length
		const contentHTML 		= responseText.slice(contentStartIdx, contentEndIdx)

		// Getting MarkDown
		const challengeContent = '# ' + contentHTML
			.replaceAll(/<pre><code>|<\/code><\/pre>/g, '```\n')
			.replaceAll(/<code>|<\/code>/g, '`')
			.replaceAll(/<em>|<\/em>/g, '*')
			.replaceAll(/<\/.+?>/g, '\n')
			.replaceAll(/<.+?>/g, '')


		// Gets AoC input content
		response 		= await fetch(
			getTodayInput( year, day ),
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

const getRootDir = dirnamePath => path.resolve(dirnamePath, '..')

const getYearPathFromPath = folderDayPath => {
	return folderDayPath.replace(/day-\d{1,}/, '')
}

const getTemplateContents = async () => {
	const TEMPLATES_PATH = `${ __dirname }/templates.txt`
	let contents = await fs.readFile( TEMPLATES_PATH, 'utf-8' )
	contents = contents.split('---').reduce((acc, _content) => {
		// const fileDestination = _content.match(/\/\/\s*(.+?)\.js/)[0].replaceAll(/[\/*(.+?)\.js]/g, '')
		const fileDestination = _content
			.match(/\/\/\s*(.+?)\.js/)[0]
			.replaceAll(/\/|\s|\.js/g, '')

			acc[ fileDestination ] = _content.replace(/\/\/\s*(.+?)\.js/, '').trim()
			return acc
	}, {})
	return contents
}

/**
 * Creates all necessary folders / files to be ready to start
 *  - folder for x year if necessary
 * 	- folder for x day if necessary
 *  - file index.js
 *  - file README.md
 * 
 * @param {*} year 
 * @param {*} day 
 */
const setChallengeFolder = async( folderDayPath ) => {
	const folderYearPath = getYearPathFromPath(folderDayPath)

	const day = folderDayPath.slice(-2)

	try {
		await fs.access( folderYearPath )
		await fs.mkdir( folderDayPath )
		let { index, services } = await getTemplateContents()
		index = `console.info('TODO: Day ${ day }')\n${index}`
		
		await fs.writeFile(`${ folderDayPath }/index.js`, index )
		await fs.writeFile(`${ folderDayPath }/services.js`, services )
		await fs.writeFile(`${ folderDayPath }/README.md`, '')
		await fs.writeFile(`${ folderDayPath }/input.txt`, '')
	} catch( error ){
		watchError(error.message)
		console.error(error)
		await fs.mkdir(folderYearPath)
		await setChallengeFolder(folderDayPath)
	}
	return {
		folderDay	: folderDayPath,
		readmeFile	: `${ folderDayPath }/README.md`,
		jsFile		: `${ folderDayPath }/index.js`,
		inputFile	: `${ folderDayPath }/input.txt`
	}
}



module.exports = {
	getRootDir,
	getTodayAoCChallenge,
	setChallengeFolder
}