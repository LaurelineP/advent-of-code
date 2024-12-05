
 /* -------------------------------------------------------------------------- */
 /*                                   HELPERS                                  */
 /* -------------------------------------------------------------------------- */
/**
 * Tools that could be use around within the algo
 * - non-agnostics: code related to project decisions: knows about how the app works
 * - are code implementation helpers
 * - are bound to logic business
 */

const { getRootDir, formatDay } = require('./utils')

const {
	CURRENT_YEAR,
	CURRENT_DAY,
	AOC_URL,
	DATE_SEGMENT_LENGTH,
	DAY_SEGMENT_LENGTH
} = require('./constants')


/* -------------------------------------------------------------------------- */
/*                            AOC ENDPOINTS RELATED                           */
/* -------------------------------------------------------------------------- */

const getTodayEndpoint = (year, day) => `${ AOC_URL }/${ year }/day/${ day }`

const getTodayInputEndpoint = (year, day) => getTodayEndpoint( year, day ) + '/input'




/* -------------------------------------------------------------------------- */
/*                             COMMAND DEDUCTIONS                             */
/* -------------------------------------------------------------------------- */


const rootPath = getRootDir( __dirname )

/** Generates year folder path - e.g.: `<rootPath>/YYYY` */
const generateYearFolderPath = ( year = CURRENT_YEAR ) => `${ rootPath }/${ year }`


/** Generates day folder path - e.g.: `<rootPath>/YYYY/day-DD` */
const generateDayFolderPath  = ( day = CURRENT_DAY ) => {
	return `${ generateYearFolderPath() }/day-${ formatDay( day )}`
}


/* ------------------------------------ - ----------------------------------- */


/** Extracts year and date values from given path */
const extractYearAndDayFromPath = pathToExecute => {
	return pathToExecute 
		.slice(pathToExecute.length - DATE_SEGMENT_LENGTH)
		.split('/day-')
}

/** Slices year folder path from given path */
const sliceYearPathFromPath = folderDayPath => {
	return folderDayPath.slice(0, -DAY_SEGMENT_LENGTH)
}


/**  Generates folder YYYY/day-DD path string based on day  */
const getGeneratedPathByDayInput = generateDayFolderPath

/**  Generates folder YYYY/day-DD */
const getGeneratedPathByYearInput = argValue => {
	return `${ generateYearFolderPath( argValue )}/day-${ CURRENT_DAY }`
}

// 
const getGeneratedPathByDayAndYear = ( argValue ) => {
	const parsedValues = argValue.trim().split(/[-|_|\/]/)
	const year 	= parsedValues[0].length < 4 ? parsedValues[1] : parsedValues[0]
	const day 	= parsedValues[0].length < 4 ? parsedValues[0] : parsedValues[1]
	return `${generateYearFolderPath( year )}/day-${ formatDay( day )}`
}


/** Deducts path based on command arguments */
const getGeneratedPath = argValue => {
	let pathToExecute;
	if( !argValue ) pathToExecute  = generateDayFolderPath()
	else if ( argValue.length === 4 ) pathToExecute  = getGeneratedPathByYearInput( argValue )
	else if ( argValue.length < 4 ) pathToExecute  = getGeneratedPathByDayInput( argValue )
	else pathToExecute  = getGeneratedPathByDayAndYear( argValue )
	return pathToExecute
}

module.exports = {
	getTodayEndpoint,
	getTodayInputEndpoint,
	getGeneratedPath,
	extractYearAndDayFromPath,
	sliceYearPathFromPath,
}

