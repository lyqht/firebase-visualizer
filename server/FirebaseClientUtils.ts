import * as fb from "firebase";
import { FirebaseEntry, UserRecord } from "./UserRecord";

interface FirebaseQueries {
    // getActivePageLocationStats: () => Promise<Object>;
}

class FirebaseService implements FirebaseQueries {
    private data: FirebaseEntry[];
    private db: fb.database.Database;
    private ref: fb.database.Reference;

    constructor() {
        console.log("Intializing Firebase App...");
    }

    public getAllRecords = async (ref: fb.database.Reference) => {
        const records: UserRecord[] = await ref
            .once("value", snapshot => {
                console.log("Fetched data from Firebase.");
                return snapshot;
            })
            .then(result => {
                return result.exportVal();
            })
            .catch(err => {
                console.log(err);
            });
        const resultRecords = Object.keys(records).map(
            item => records[item] as FirebaseEntry
        );
        return resultRecords;
    };

    public getNumberOfUsers = async (records: FirebaseEntry[]) => {
        return records.length;
    };

    public getActivePageLocationStats = async (records: FirebaseEntry[]) => {
        let activePageMap = new Object();

        const addToMap = (pagePath: string) => {
            pagePath && activePageMap.hasOwnProperty(pagePath)
                ? (activePageMap[pagePath] = activePageMap[pagePath] + 1)
                : (activePageMap[pagePath] = 1);
        };

        records.forEach(entry => {
            const record: UserRecord = entry;
            const pagePath = getCurrentPage(record);
            if (pagePath) {
                addToMap(pagePath);
            } else {
                const mol_envs = Object.keys(entry);
                mol_envs.forEach(key => {
                    const record: UserRecord = entry[key];
                    let pagePath = getCurrentPage(record);
                    addToMap(pagePath);
                });
            }
        });
        return activePageMap;
    };
}

const getCurrentPage = (record: UserRecord) => {
    if (record.currentPage) {
        return record.currentPage.pagePath;
    }
};

export const firebaseService = new FirebaseService();
