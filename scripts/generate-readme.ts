import fs 	from 'node:fs/promises';
import path from 'node:path';

const rootPath 			= path.resolve('./');

const checkFileExists = async (filePath: string) => {
	try {
		await fs.access( filePath, fs.constants.F_OK);
		return true
	} catch( error ) {
		console.error('[ ERROR - FILE ]: file does not exists');
		return false
	}
}

const dirNameDeepNestedPattern = new RegExp(/(^\d+)\/(day-\d+)\/(README\.md)$/); // 2024/day-01/README.md
const dirNamePattern = new RegExp(/(^\d+)\/(README\.md)$/); // 2024/README.md
const getReadmeFilePaths = async( rootPath:string, dirNamePattern: RegExp ) : Promise<string[]>=> {
	try {
		const readmeFiles = await fs
			.readdir(rootPath, { recursive: true })
			.then( filesAndFolders => filesAndFolders.filter( x => dirNamePattern.test( x )))
		return readmeFiles;
	} catch (error){
		console.error(`[ Error ]: ${(error as Error)?.message || 'reading dir'}`)
		console.error( error )
		throw new Error("No README.md file found")
	}
}

const formatFolderRelPathTitle = (filePath:string) => {
	const truncFilePath = filePath.split('/').slice(0,2).join(', ');
	const parsed = truncFilePath
		.replaceAll(/[-_]/g, ' ')
		.replaceAll(/^\d+\s/g, '')
	return parsed.toUpperCase()
}

const getReadmeContents = async ( filePaths: string[] ) => {
	try {
		const fileContentsPromises =  filePaths.map( async f => {
			return {
				folderRelPath: f,
				folderNameFormatted: formatFolderRelPathTitle(f),
				content: await fs.readFile(f, { encoding: 'utf-8'})
			}
		})
		return await Promise.all( fileContentsPromises );
	} catch( error ){
		console.error(`[ ERROR - getReadmeContents ]: ${(error as Error).name}`)
		console.error(error)
	}
}

type ContenDetails = {
    folderRelPath: string;
    folderNameFormatted: string;
    content: string;
}[]
const writeToRootReadme = async( readmeFilePath: string, contentDetails: ContenDetails )=> {
	try {
		for ( let contentDetailsItem of contentDetails ){
			const title = `📌 ${ contentDetailsItem.folderNameFormatted }`;
			const innerReadmePath = contentDetailsItem.folderRelPath;
			let folderRelPathOpeningTag = `\n\n## 💻 Challenges`
			folderRelPathOpeningTag += `<details>\n\t<summary>${title}</summary>`;
			folderRelPathOpeningTag += `\n\n[✏️ Need to update this Readme Section?](./${ innerReadmePath })\n`


			const folderRelPathClosingTag = `\n</details>\n`;
			
			const content = `${folderRelPathOpeningTag}\n${contentDetailsItem.content}\n${folderRelPathClosingTag}`
			await fs.appendFile(readmeFilePath, content )
		}
	} catch( error ){
		console.error(`[ ERROR - writeToRootReadme ] : ${(error as Error).name}`)
	}
}

const generateReadme = async ( basePath: string , readmePathPattern: RegExp ) => {
	const README_PATH 			= `${ basePath }/README.md`;
	const README_HEADER_PATH 	= `${ basePath }/templates/readme-header.md`;

	console.info('Executing script for readme...')

	const readmeFilePaths = await getReadmeFilePaths( basePath, readmePathPattern );

	const contentsDetails = await getReadmeContents( readmeFilePaths.sort() );

	const doesReadmeHeaderExists = await checkFileExists( README_HEADER_PATH )
	const readmeHeader 	  = doesReadmeHeaderExists
		&& await fs.readFile(README_HEADER_PATH, { encoding: 'utf-8' });


	const writeFileArgs: [string, string] = doesReadmeHeaderExists
		? [ README_PATH, readmeHeader + '\n\n\n']
		: [ README_PATH, '\n'];

	try {
		// overriding content
		await fs.writeFile( ...writeFileArgs )
		console.log('contentsDetails:', contentsDetails)
		contentsDetails && await writeToRootReadme( README_PATH, contentsDetails )
	} catch( error ){
		console.error( '[ ERROR - MAIN ]: failing generating readme')
	}

	console.info('Finished executing script for readme 🎉')
}


const main = async ( rootPath: string ) => {

	/** TODO - generate a readme per folder year 
		- generate first the year folder readme ( or create )
		- then generate main - year content markdown should be links
		and not html details as in main ( handy )
		Objective: think ahead for other years and how big the main readme will get
		displaying all challenge description
	*/
	try {
		await generateReadme ( rootPath, dirNameDeepNestedPattern )
	} catch( error ){
		console.error(error)
	}


}
await main(rootPath)

process.exit(0);