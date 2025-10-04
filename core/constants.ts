import { formatDay } from "./utils";

/* -------------------------------------------------------------------------- */
/*                               PROJECT RELATED                              */
/* -------------------------------------------------------------------------- */
const APP_NAME = "advent-of-code";
const TEMPLATE_SEPARATOR = "---";
const LOG_SEPARATOR = "=====================================================";

/* -------------------------------------------------------------------------- */
/*                                DATE RELATED                                */
/* -------------------------------------------------------------------------- */
const CURRENT_DATE = new Date();
const CURRENT_YEAR = CURRENT_DATE.getFullYear();
const CURRENT_DAY = formatDay(CURRENT_DATE.getDate());
const DATE_SEGMENT_LENGTH = "YYYY/day-DD".length;
const DAY_SEGMENT_LENGTH = "/day-DD".length;

/* -------------------------------------------------------------------------- */
/*                               ADVENT OF CODE                               */
/* -------------------------------------------------------------------------- */
const AOC_URL = `https://adventofcode.com`;

export {
    APP_NAME,
    CURRENT_DATE,
    CURRENT_YEAR,
    CURRENT_DAY,
    DATE_SEGMENT_LENGTH,
    DAY_SEGMENT_LENGTH,
    TEMPLATE_SEPARATOR,
    AOC_URL,
    LOG_SEPARATOR,
};
