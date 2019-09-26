import * as fs from "fs";
export const generateJson = (nameOfFile: string, data: Object) => {
    const json = JSON.stringify(data, null, 4);
    fs.writeFileSync(nameOfFile, json, "utf8");
};
