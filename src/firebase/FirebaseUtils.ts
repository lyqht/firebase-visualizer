import * as admin from "firebase-admin";
import * as fs from "fs";
import { clientEmail, privateKey, projectId, databaseURL } from "../AppConfig";
import { UserRecord, firebaseEnvs, FirebaseEntry, MOLEnvs } from "./UserRecord";

// const credential: admin.credential.Credential = admin.credential.applicationDefault()

interface FirebaseQueries {
    getActivePageLocationStats: () => Promise<Object>;
}

class FirebaseUtils implements FirebaseQueries {
    private data: FirebaseEntry[];
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
        const db: admin.database.Database = app.database();
        this.ref = db.ref("MOLAppState");
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
        // console.log(records);
        return records;
    };

    public generateJson = () => {
        const json = JSON.stringify(this.data, null, 4);
        fs.writeFileSync("data.json", json, "utf8");
    };

    public getNumberOfUsers = async () => {
        if (!this.data) {
            const records = await this.getAllRecords();
            this.data = Object.keys(records).map(
                item => records[item] as FirebaseEntry
            );
        }
        console.log(this.data.length);
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
                    const pagePath = getCurrentPage(record);
                    addToMap(pagePath);
                });
            }
        });
        console.log(activePageMap);
        return activePageMap;
    };
}

const getCurrentPage = (record: UserRecord) => {
    if (record.currentPage) {
        return record.currentPage.pagePath;
    }
};

export const firebaseUtils = new FirebaseUtils();
firebaseUtils.getActivePageLocationStats();
