import { getInputData, handleData } from "./services";
import { logValue } from "../../core/tools";

const runPartOne = (data: string) => {
    console.info("\n1. Eval multiplications & Summed result");

    const result = handleData(data, "runPartOne");
    if (!result) {
        console.warn("Couldn't compute a result");
    }
    logValue({ result });
};

const runPartTwo = (data: string) => {
    // WIP
    console.info(
        "\n2. Eval and Summed filtered out `don't()` remaining values",
    );

    const result = handleData(data, "runPartTwo");
    if (!result) {
        console.warn("Couldn't compute a result");
        return;
    }

    logValue({ result });
};

const runSolutions = async () => {
    const data = (await getInputData()) || "";
    // Example: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    runPartOne(data);
    runPartTwo(data);
    /**
		
		1. Eval multiplications & Summed result
		┌─────────┬───────────┐
		│ (index) │  result   │
		├─────────┼───────────┤
		│  value  │ 179571322 │
		└─────────┴───────────┘
	 */
};
runSolutions();
