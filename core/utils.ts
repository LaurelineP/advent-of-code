/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */
/* Agnostics functions to use within the project in any file */

import fs from "node:fs/promises";
import path from "node:path";

import { watchError } from "./tools";

const getRootDir = (dirnamePath: string) => path.resolve(dirnamePath, "..");

const doesPathExist = async (fileOrFolderPath: string) => {
    try {
        const pathStats = await fs.stat(fileOrFolderPath);
        return !!pathStats;
    } catch (error) {
        if (error?.code === "ENOENT") {
            return false;
        }
        watchError(error);
    }
};

/* ----------------------------- DATE FORMATTING ---------------------------- */

const formatDay = (value: string | number) =>
    Number(value) > 9 ? Number(value) : `${Number(value)}`.padStart(2, "0");

export { getRootDir, doesPathExist, formatDay };
