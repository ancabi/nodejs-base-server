import { Router } from "express";
import auth from "./auth";
import user from "./user";
import { PruebaController } from '../controllers/PruebaController';

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);

routes.post("/prueba", PruebaController.prueba);

export default routes;
