import express from "express";
import * as homeController from "./home";

const controllersRouter = express.Router();

controllersRouter.use(homeController.router);

export default controllersRouter;