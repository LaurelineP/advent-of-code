
import fs 				from 'node:fs/promises'
import path 				from 'node:path'

import { watchError } 	from './tools'
import { doesPathExist } from './utils'

import {
	sliceYearPathFromPath, 
	getTodayEndpoint,
	getTodayInputEndpoint
} from './helpers'

import { TEMPLATE_SEPARATOR, } from './constants'
import type { Path } from 'typescript'

/* -------------------------------------------------------------------------- */
/*                                     AOC                                    */
/* -------------------------------------------------------------------------- */
/** Gets AoC HTML content challenge description in MD */
const getTodayAoCChallenge = async (year: string, day: string) : Promise<{challengeContent: string, inputContent: string }> => {
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
	} catch( error: unknown ){
		if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error(error)
        }
        throw error
	}

}


/* -------------------------------------------------------------------------- */
/*                                 FILE SYSTEM                                */
/* -------------------------------------------------------------------------- */

/** Create folder path recursively ( parents folders if necessary ) */
const createChallengeFolder = async (generatedPath: string | Path) => {
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
const getTemplateContents = async (): Promise<Record<string, string> >=> {

	const TEMPLATES_PATH = path.resolve(__dirname, '..', 'templates', 'prep-challenge-templates.txt');

	try {
		const textContent = await fs.readFile( TEMPLATES_PATH, 'utf-8' )
		const splitTexts = textContent.split(TEMPLATE_SEPARATOR)
		if (!splitTexts.length) throw new Error("File code missing")

		const textPerFile = splitTexts
			.reduce<Record<string,string>>((acc, text: string) => {
				// File name with its extension
				const fileIndicatorPtrn = /^\n?\/{2}\s?\w+\.[j|t]s/
				
				const matched = text.match(fileIndicatorPtrn)
				if (!matched) {
					console.error("File indicator not found in text:", text)
					return acc
				}

				// const fileDestination = matched[0].replaceAll(/(\/{2}|\.[j|t]s)/g, "").trim()
				const fileDestination = matched[0].replaceAll("//", "").trim()


				// File code content
				const fileContent = text.replace(fileIndicatorPtrn, '').trim()
			

				acc[ fileDestination ] = fileContent
				return acc
			}, {})
		return textPerFile
	} catch( error: unknown ){
		if (error instanceof Error) {
            console.error(error.message)
			watchError( error )
        }
		return {}
	}
}
/**
 * Creates all necessary folders / files to be ready to start developing
 *  - folder for x year if necessary
 * 	- folder for x day if necessary
 *  - file index.ts
 *  - file README.md
 */
const setupChallengeFolder = async (folderDayPath: string) => {
	const folderYearPath = sliceYearPathFromPath( folderDayPath )

	const day = folderDayPath.slice( -2 )

	try {
		const doesExist = await doesPathExist( folderYearPath )
		if( doesExist ){

			let contentPerFile = await getTemplateContents()

			const files = Object.keys(contentPerFile)
			if(!files.length) throw new Error("Missing content to generate current day files.")


			for( let file of files ){
				let content = contentPerFile[file]
				if( !content ) break
				if( file.includes('index') ){
					content = `console.info('TODO: Day ${ day }')\n${content}`
				}
				await fs.writeFile(`${ folderDayPath }/${ file }`, content )
			}

			await fs.writeFile(`${ folderDayPath }/README.md`, '')
			await fs.writeFile(`${ folderDayPath }/input.txt`, '')
		}
	} catch( error ){
		watchError( error as Error )
		console.error( error )
	}
	return {
		folderDay	: folderDayPath,
		readmeFile	: `${ folderDayPath }/README.md`,
		jsFile		: `${ folderDayPath }/index.ts`,
		inputFile	: `${ folderDayPath }/input.txt`
	}
}



export {
	createChallengeFolder,
	getTodayAoCChallenge,
	setupChallengeFolder
}