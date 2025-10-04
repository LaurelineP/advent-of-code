
import { useInputPath } from '../../utils'


const INPUT_FILE = useInputPath( __dirname )
const MULTIPLY_PATTERN = /mul\(\d+,\d+\)/g
const DONT_MULTIPLY_PATTERN = /don't\(\).+?mul\(\d+,\d+\).+?do\(\)/g


export {
	INPUT_FILE,
	MULTIPLY_PATTERN,
	DONT_MULTIPLY_PATTERN,
}