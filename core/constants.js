const { formatDay } = require('./utils')




/* -------------------------------------------------------------------------- */
/*                               PROJECT RELATED                              */
/* -------------------------------------------------------------------------- */
const APP_NAME = require('../package.json').name
const TEMPLATE_SEPARATOR = '---'


/* -------------------------------------------------------------------------- */
/*                                DATE RELATED                                */
/* -------------------------------------------------------------------------- */
const CURRENT_DATE = new Date()
const CURRENT_YEAR = CURRENT_DATE.getFullYear()
const CURRENT_DAY  = formatDay( CURRENT_DATE.getDay() + 1)
const DATE_SEGMENT_LENGTH = 'YYYY/day-DD'.length
const DAY_SEGMENT_LENGTH = '/day-DD'.length



/* -------------------------------------------------------------------------- */
/*                               ADVENT OF CODE                               */
/* -------------------------------------------------------------------------- */
const AOC_URL = `https://adventofcode.com`


module.exports = {
	APP_NAME,
	CURRENT_DATE,
	CURRENT_YEAR,
	CURRENT_DAY,
	DATE_SEGMENT_LENGTH,
	DAY_SEGMENT_LENGTH,
	TEMPLATE_SEPARATOR,
	AOC_URL
}


