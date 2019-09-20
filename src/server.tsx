import Koa from "koa";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import HomePage from "./views/home";
import { firebaseUtils } from "./firebase/FirebaseUtils";

const app = new Koa();
const port: number = 3000;

app.listen(port);
console.log("Server started!");

app.use(async ctx => {
    const stats = await firebaseUtils.getActivePageLocationStats();
    const userCount = await firebaseUtils.getNumberOfUsers();
    ctx.body = ReactDOM.renderToStaticMarkup(
        <HomePage locationStats={stats} userCount={userCount} />
    );
});
