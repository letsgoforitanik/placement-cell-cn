import dotenv from "dotenv";

dotenv.config();

const environment = {
    nodeEnv: process.env.NODE_ENV!,
    port: process.env.PORT!,
    dbConnectionString: process.env.DB_CONNECTION_STRING!,
    sessionSecret: process.env.SESSION_SECRET!
};

export default environment;