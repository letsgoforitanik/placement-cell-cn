import { SessionOptions } from "express-session";
import environment from "./environment";

const sessionConfig: SessionOptions = {
    name: 'placement-cell',
    secret: environment.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 20 * 60 * 1000
    }
};

export default sessionConfig;