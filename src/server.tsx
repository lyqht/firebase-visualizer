import Koa from "koa";
import Router from "koa-router";
import React from "react";
import * as ReactDOM from "react-dom/server";
import { firebaseUtils } from "./firebase/FirebaseUtils";
import HomePage from "./views/HomePage";
import { DetailViewMode } from "./views/LocationSection";

const app = new Koa();
const router = new Router();
const port: number = 3000;

app.listen(port);
console.log("Server started!");

app.use(router.routes()).use(router.allowedMethods());

router.get("/", async (ctx, next) => {
    const stats = await firebaseUtils.getActivePageLocationStats();
    const userCount = await firebaseUtils.getNumberOfUsers();
    ctx.body = ReactDOM.renderToString(
        <HomePage
            locationStats={stats}
            userCount={userCount}
            detailViewMode={DetailViewMode.TABLE_VIEW}
        />
    );
});

router.get("/table", async (ctx, next) => {
    const stats = await firebaseUtils.getActivePageLocationStats();
    const userCount = await firebaseUtils.getNumberOfUsers();
    ctx.body = ReactDOM.renderToString(
        <HomePage
            locationStats={stats}
            userCount={userCount}
            detailViewMode={DetailViewMode.TABLE_VIEW}
        />
    );
});
