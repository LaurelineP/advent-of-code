import { getInputData, isSaveRow, isSaveable } from './services'
import { logValue, watchError } from '../../core/tools'

let edgeCases: any[] = []
let totalSaved = 0

const runPartOne = (data: any) => {
    try {
        const areSafeRows = data.map(isSaveRow)
        const savedCount = areSafeRows.filter(Boolean).length
        totalSaved += savedCount

        // Edge cases are those rows that did not pass the isSaveRow check
        edgeCases = data.filter((_, idx: number) => !areSafeRows[idx])

        console.info('\n1. Safe reports count')
        logValue({ savedCount })
    } catch (error) {
        console.error('Part One failed')
        console.error(error)
    }
}

const runPartTwo = (data: any) => {
    console.info('\n2. Count with extra safe reports')
    const extraSaved = data.filter(isSaveable)
    logValue({ savedCount: totalSaved + extraSaved.length })
}

const runSolutions = async () => {
    try {
        const data = await getInputData()
        runPartOne(data)
        runPartTwo(edgeCases)
    } catch (error) {
        watchError(error.message)
        console.error(error)
    }
}

runSolutions()
/**
		=============== 📌 Day 02 - AoC 2024 =============== 

		1. Safe reports count
		┌─────────┬────────────┐
		│ (index) │ savedCount │
		├─────────┼────────────┤
		│  value  │    306     │
		└─────────┴────────────┘

		2. Count with extra safe reports
		┌─────────┬────────────┐
		│ (index) │ savedCount │
		├─────────┼────────────┤
		│  value  │    366     │
		└─────────┴────────────┘
	*/
