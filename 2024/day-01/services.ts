import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "node:fs/promises";
import { useInputPath } from "../../utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const INPUT_FILE = useInputPath(__dirname);

const formatInputData = (data: string) => {
    const splittedLines = data
        // 1. gets lines
        .split(/\n/g)

        // 2. gets and format values per lines
        .map((lineStr) => lineStr.split(/\s+/).map(Number))

        // 3. gets 2 arrays from left values and right values
        .reduce<[number[], number[]]>(
            (acc, item) => {
                const [colVal1, colVal2] = item;
                if (colVal1) acc[0].push(colVal1);
                if (colVal2) acc[1].push(colVal2);
                return acc;
            },
            [[], []],
        );
    return splittedLines;
};
async function getInputData() {
    try {
        const content = await readFile(INPUT_FILE, "utf-8");
        const dataFormatted = formatInputData(content);
        return dataFormatted;
    } catch (error) {
        console.error("A problem occurred");
        console.error((error as Error).message);
    }
}

export { getInputData };
