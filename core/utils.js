
/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */
/* Agnostics functions to use within the project in any file */

const fs = require('node:fs/promises')
const path = require('node:path')

const { watchError } = require('./tools')

const getRootDir = dirnamePath => path.resolve( dirnamePath, '..' )

const doesPathExist = async fileOrFolderPath => {
	try {
		const pathStats = await fs.stat( fileOrFolderPath )
		return !!pathStats
	} catch( error ){
		if( error.code === 'ENOENT' ){
			return false
		}
		watchError( error )
	}
}



/* ----------------------------- DATE FORMATTING ---------------------------- */

const formatDay = (value) => Number(value) > 9
	? Number(value)
	: `${ Number(value) }`.padStart(2,'0')

module.exports = {
	getRootDir,
	doesPathExist,
	formatDay,
}
