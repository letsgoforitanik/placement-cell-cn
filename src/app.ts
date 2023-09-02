import http from "http";
import express, { Express } from "express";
import ejsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";

import controllersRouter from "@/controllers";
import { environment, initializeDb, sessionConfig } from "@/config";
import { getPath, extendExpress } from "@/helpers";
import { locals } from "@/middlewares";


function configureAppSettings(app: Express) {
    const fileRoot = environment.nodeEnv === 'production' ? 'dist' : 'src';

    app.set("view engine", "ejs");
    app.set("views", getPath(fileRoot, "views"));
    app.set("layout", getPath(fileRoot, "views/layout/main"));
}


function configureApp(app: Express) {
    app.use(ejsLayouts);
    app.use(express.static('dist/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session(sessionConfig));
    app.use(flash());
    app.use(locals);
    app.use(controllersRouter);
}


async function main() {

    console.log(`Environment : ${environment.nodeEnv}`);

    extendExpress();

    const app = express();

    configureApp(app);

    configureAppSettings(app);

    await initializeDb();
    console.log(`Database connection is made successfully`);

    const { port } = environment;

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is running at port ${port}`));

}

main();