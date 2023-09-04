import express from "express";
import * as homeController from "./home";
import * as studentController from "./student";
import * as interviewController from "./interview";

const controllersRouter = express.Router();

controllersRouter.use(homeController.router);
controllersRouter.use(studentController.router);
controllersRouter.use(interviewController.router);

export default controllersRouter;