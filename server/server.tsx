import cors from "@koa/cors";
import Koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import json from "koa-json";
import { firebaseUtils } from "./FirebaseUtils";

const app = new Koa();
const router = new Router();
const port: number = 3000;

app.listen(port);
console.log("Server started!");

app.use(json())
    .use(bodyparser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

router.get("/data", async (ctx, next) => {
    const locationStats = await firebaseUtils.getActivePageLocationStats();
    const userCount = await firebaseUtils.getNumberOfUsers();
    ctx.body = { locationStats, userCount };
    return next();
});

router.post("/test", async (ctx, next) => {
    const { pagePath } = ctx.request.body;
    const ref = firebaseUtils.getRootRef();
    const testData = {
        test: {
            DeviceInfo: {
                apiLevel: 28,
                deviceId: "CLT",
                deviceLocale: "en-SG",
                manufacturer: "HUAWEI",
                systemName: "Android",
                systemVersion: "9",
                timezone: "Asia/Singapore"
            },
            appState: "background",
            appVersion: "1.5.1",
            currentPage: {
                pagePath,
                passProps: {
                    shouldShowAADisclaimerModal: false
                }
            },
            isConnected: false,
            lastUpdated: 1569578894321,
            pushToken:
                "f9QG9i_qZFY:APA91bFTcG9rzipqUNfyHQJeca4Xbxy9XRYCswLwx1sIFgRdHN1cKlCW5bVGfZJ6G-8uxFbA4HFgf8tBQJYj-RgtwQeH4GhZaRpIGX03lqtGPt69PofdYwC2FXu80bpRnq9bG23yCksO"
        }
    };
    ref.push(testData);
    ctx.res.statusCode = 200;
    ctx.body = await firebaseUtils.getAllRecords();
    return next();
});

// Deleting items
// router.delete("/", async (ctx, next) => {
//     const db = firebaseUtils.getDB();
//     const keyword = ctx.request.body;
//     const del_ref = db.ref("/MOLAppState" + keyword);
//     del_ref.remove();
//     ctx.res.statusCode = 200;
//     return next();
// });
