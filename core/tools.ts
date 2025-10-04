/** Logs helper - for a given value, log display a table  */
export const logValue = (value: unknown) => {
    let logger = console.table;
    if (
        value instanceof Object &&
        Object.values(value).some((v) => v instanceof Object)
    ) {
        logger = console.info;
    }
    logger({ value });
    return value;
};

/** Error callback logger - logs error or logs No Error Feedback */
export const watchError = (err: Error, isSilenced?: boolean) => {
    if (err) {
        const message = "\n❌ [ ERROR CAUGHT ]:";
        console.error(message, err.message);
        return err;
    }
    if (!isSilenced) console.info("\nGood to Proceed!");
};

/** Success callback logger - logs and returns data */
export const watchData = (data: unknown) => {
    if (data) {
        this.logValue({ data });
        return data;
    }
    return;
};
