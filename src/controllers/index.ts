import express from "express";
import * as homeController from "./home";
import * as studentController from "./student";
import * as interviewController from "./interview";
import * as jobController from "./job";
import * as errorController from "./error";

const controllersRouter = express.Router();

controllersRouter.use(homeController.router);
controllersRouter.use(studentController.router);
controllersRouter.use(interviewController.router);
controllersRouter.use(jobController.router);
controllersRouter.use(errorController.router);

export default controllersRouter;