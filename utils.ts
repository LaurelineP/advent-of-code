import path from "node:path";

const useInputPath = (folderDirName: string) => {
    return path.resolve(folderDirName, "input.txt");
};

export { useInputPath };
