import http from "http";
import express from "express";

import { environment, initializeDb } from "@/config";


async function main() {

    console.log(`Environment : ${environment.nodeEnv}`);

    const app = express();

    await initializeDb();
    console.log(`Database connection is made successfully`);

    const { port } = environment;

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Server is running at port ${port}`));

}

main();