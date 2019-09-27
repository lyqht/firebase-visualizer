import Koa from "koa";
import Router from "koa-router";
import React from "react";
import cors from "@koa/cors";
import * as ReactDOM from "react-dom/server";
import { firebaseUtils } from "./FirebaseUtils";
// import HomePage from "../views/HomePage";
// import { DetailViewMode } from "../views/LocationSection";

const app = new Koa();
const router = new Router();
const port: number = 3000;

app.listen(port);
console.log("Server started!");

app.use(router.routes())
    .use(router.allowedMethods())
    .use(cors());

router.get("/data", async (ctx, next) => {
    const locationStats = await firebaseUtils.getActivePageLocationStats();
    const userCount = await firebaseUtils.getNumberOfUsers();
    ctx.body = { locationStats, userCount };
    return next();
});

router.get("/table", async (ctx, next) => {
    const stats = await firebaseUtils.getActivePageLocationStats();
    const userCount = await firebaseUtils.getNumberOfUsers();
    // ctx.body = ReactDOM.renderToString(
    //     <HomePage
    //         locationStats={stats}
    //         userCount={userCount}
    //         detailViewMode={DetailViewMode.TABLE_VIEW}
    //     />
    // );
});
