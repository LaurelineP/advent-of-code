
 /* -------------------------------------------------------------------------- */
 /*                                   HELPERS                                  */
 /* -------------------------------------------------------------------------- */
/**
 * Tools that could be use around within the algo
 * - non-agnostics: code related to project decisions: knows about how the app works
 * - are code implementation helpers
 * - are bound to logic business
 */

import { getRootDir, formatDay } from './utils'

import {
	CURRENT_YEAR,
	CURRENT_DAY,
	AOC_URL,
	DATE_SEGMENT_LENGTH,
	DAY_SEGMENT_LENGTH
} from './constants'

/* -------------------------------------------------------------------------- */
/*                            AOC ENDPOINTS RELATED                           */
/* -------------------------------------------------------------------------- */

const getTodayEndpoint = (year: string | number, day: string | number) => {
	return `${ AOC_URL }/${ Number(year) }/day/${ Number(day) }`
}

const getTodayInputEndpoint = (year: string | number, day: string | number) => {
	return getTodayEndpoint( Number(year), Number(day) ) + '/input'
}




/* -------------------------------------------------------------------------- */
/*                             COMMAND DEDUCTIONS                             */
/* -------------------------------------------------------------------------- */


const rootPath = getRootDir( __dirname )

/** Generates year folder path - e.g.: `<rootPath>/YYYY` */
const generateYearFolderPath = ( year : string | number = CURRENT_YEAR ) => `${ rootPath }/${ year }`


/** Generates day folder path - e.g.: `<rootPath>/YYYY/day-DD` */
const generateDayFolderPath  = ( day = CURRENT_DAY ) => {
	return `${ generateYearFolderPath() }/day-${ formatDay( day )}`
}


/* ------------------------------------ - ----------------------------------- */


/** Extracts year and date values from given path */
const extractYearAndDayFromPath = (pathToExecute: string) => {
	return pathToExecute 
		.slice(pathToExecute.length - DATE_SEGMENT_LENGTH)
		.split('/day-')
}

/** Slices year folder path from given path */
const sliceYearPathFromPath = (folderDayPath: string) => {
	return folderDayPath.slice(0, -DAY_SEGMENT_LENGTH)
}


/**  Generates folder YYYY/day-DD path string based on day  */
const getGeneratedPathByDayInput = generateDayFolderPath

/**  Generates folder YYYY/day-DD */
const getGeneratedPathByYearInput = ( argYearValue: string | number ) => {
	return `${ generateYearFolderPath( argYearValue )}/day-${ CURRENT_DAY }`
}

/** Generates folder YYY/day-DD - based on expected input with day and year (any format) */ 
const getGeneratedPathByDayAndYear = ( argDateValue: string ) => {
	const parsedValues = argDateValue.trim().split(/[-|_|\/]/)

	
	const [first, second] = parsedValues;
	if( !first || !second ){
		throw new SyntaxError("Error with provided date")
	}

	const year 	= first.length < 4 ? second : first
	const day 	= first.length < 4 ? first : second
	return `${generateYearFolderPath( year )}/day-${ formatDay( day )}`
}


/** Deducts path based on command arguments */
const getGeneratedPath = (argValue: string) => {
	let pathToExecute;
	if( !argValue ) pathToExecute  = generateDayFolderPath()
	else if ( argValue.length === 4 ) pathToExecute  = getGeneratedPathByYearInput( argValue )
	else if ( argValue.length < 4 ) pathToExecute  = getGeneratedPathByDayInput( argValue )
	else pathToExecute  = getGeneratedPathByDayAndYear( argValue )
	return pathToExecute
}

export {
	getTodayEndpoint,
	getTodayInputEndpoint,
	getGeneratedPath,
	extractYearAndDayFromPath,
	sliceYearPathFromPath,
}

