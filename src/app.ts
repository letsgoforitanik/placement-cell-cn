import http from "http";
import express from "express";
import { environment } from "@/config";

function main() {
    const app = express();
    const server = http.createServer(app);
    server.listen(() => console.log(`Server is runnning at port ${environment.port}`));
}

main();