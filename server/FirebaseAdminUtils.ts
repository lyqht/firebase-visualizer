import * as admin from "firebase-admin";
import { clientEmail, databaseURL, privateKey, projectId } from "./AppConfig";
import { generateJson } from "./helpers/fileUtils";
import { FirebaseEntry, UserRecord } from "./UserRecord";

interface FirebaseQueries {
    getActivePageLocationStats: () => Promise<Object>;
}

class FirebaseUtils implements FirebaseQueries {
    private data: FirebaseEntry[];
    private db: admin.database.Database;
    private ref: admin.database.Reference;

    constructor() {
        console.log("Intializing Firebase App...");
        const credential: admin.credential.Credential = admin.credential.cert({
            projectId,
            clientEmail,
            privateKey
        });

        const app: admin.app.App = admin.initializeApp({
            credential,
            databaseURL
        });
        this.db = app.database();
        this.ref = this.db.ref("MOLAppState");
    }

    public getAllRecords = async () => {
        const records: UserRecord[] = await this.ref
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
        this.data = Object.keys(records).map(
            item => records[item] as FirebaseEntry
        );
        generateJson("firebase_data.json", records);
        return records;
    };

    public getNumberOfUsers = async () => {
        if (!this.data) {
            const records = await this.getAllRecords();
            this.data = Object.keys(records).map(
                item => records[item] as FirebaseEntry
            );
        }
        return this.data.length;
    };

    public getActivePageLocationStats = async () => {
        let activePageMap = new Object();
        if (!this.data) {
            const records = await this.getAllRecords();
            this.data = Object.keys(records).map(
                item => records[item] as FirebaseEntry
            );
        }

        const addToMap = (pagePath: string) => {
            pagePath && activePageMap.hasOwnProperty(pagePath)
                ? (activePageMap[pagePath] = activePageMap[pagePath] + 1)
                : (activePageMap[pagePath] = 1);
        };

        this.data.forEach(entry => {
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
        console.log(activePageMap);
        return activePageMap;
    };

    public getTableData = () => {};

    public getDB = () => {
        return this.db;
    };

    public getRootRef = () => {
        return this.ref;
    };
}

const getCurrentPage = (record: UserRecord) => {
    if (record.currentPage) {
        return record.currentPage.pagePath;
    }
};

export const firebaseUtils = new FirebaseUtils();
