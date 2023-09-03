import express from "express";
import * as homeController from "./home";
import * as studentController from "./student";

const controllersRouter = express.Router();

controllersRouter.use(homeController.router);
controllersRouter.use(studentController.router);

export default controllersRouter;