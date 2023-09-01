import dotenv from "dotenv";

dotenv.config();

const environment = {
    nodeEnv: process.env.NODE_ENV!,
    port: process.env.PORT!
};

export default environment;