import { readFile } from "fs/promises";
import { useInputPath } from "../../utils";

const INPUT_FILE = useInputPath(__dirname);

const INCLUDED_DELTAS = [1, 2, 3];

const isDeltaIncluded = (d: number) => INCLUDED_DELTAS.includes(d);

const getRowOrder = (row: number[]) => {
    const rowOrderRef = row.toString();
    const rowOrderInc = [...row].sort((a, b) => a - b).toString();
    const rowOrderDec = [...row].sort((a, b) => b - a).toString();

    return rowOrderRef === rowOrderInc
        ? "inc"
        : rowOrderRef === rowOrderDec
          ? "dec"
          : "unordered";
};

// Checks (report) if "safe" ( delta being between 1 - 3 for following row's value )
const isSaveRow = (row: number[]) => {
    const _isSaveRow = row.every((value, idx) => {
        const prev = row[idx - 1] || 0;
        const next = row[idx + 1] || 0;

        const hasNext = !isNaN(next);

        /* ----------------------------- BASIC SAFE ROW ----------------------------- */
        // Controller of delta value based on order
        const orderController = {
            inc: hasNext ? next - value : value - prev,
            dec: hasNext ? value - next : prev - value,
        };

        // Handles row's value order - check if values are following sequence
        const order = getRowOrder(row);
        const delta = orderController[order as "inc" | "dec"] || null;

        return !!delta && isDeltaIncluded(delta);
    });
    return _isSaveRow;
};

const isSaveable = (row: number[]) => {
    const isNotEligible = row.length < 2;
    if (isNotEligible) return false;

    // Found value -> indicates the row is safe without that value
    const saveableRow = row.find((_: unknown, idx: number) => {
        const temp = [...row].toSpliced(idx, 1);
        const isSafeRowCandidate = isSaveRow(temp);
        return isSafeRowCandidate;
    });

    return !!saveableRow;
};

const formatInputData = (content: string) => {
    if (!content) return content;
    return content
        .split(/\n/)
        .map((row) => row.split(/\s+/).map((value) => Number(value)));
};

const getInputData = async () => {
    try {
        const content = await readFile(INPUT_FILE, "utf-8");
        const data = formatInputData(content);
        return data;
    } catch (error) {
        console.error("Error while getting data", error);
    }
};

export { getInputData, isDeltaIncluded, isSaveRow, isSaveable };
