const path = require('path')

const useInputPath = folderDirName => {
	return path.resolve( folderDirName, 'input.txt' )
}


module.exports = {
	useInputPath
}