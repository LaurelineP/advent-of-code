
const fs 				= require('node:fs/promises')
const path 				= require('node:path')
const { getTodayEndpoint, getTodayInput } 	= require('./constants')
const { writeFile } = require('node:fs')


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
			{ headers: { cookie: `session=${ process.env.COOKIE }` }
		})
		const inputContent = await response.text()

		return { challengeContent, inputContent}
	} catch( error ){
		console.error( error )
	}

}


/* -------------------------------------------------------------------------- */
/*                                 FILE SYSTEM                                */
/* -------------------------------------------------------------------------- */

const getRootDir = dirnamePath => path.resolve(dirnamePath, '..')



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
	const folderYearPath = folderDayPath.replace(/day-\d{1,}/, '')

	const day = folderDayPath.slice(-2)
	try {
		await fs.access( folderYearPath )
		await fs.mkdir( folderDayPath )
		await fs.writeFile(`${ folderDayPath }/index.js`, `console.info('TODO: Day ${ day }')`)
		await fs.writeFile(`${ folderDayPath }/README.md`, '')
		await fs.writeFile(`${ folderDayPath }/input.txt`, '')
	} catch( error ){
		console.error(error.message)
		console.error(error)
		await fs.mkdir(folderYearPath)
		setChallengeFolder(folderDayPath)
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