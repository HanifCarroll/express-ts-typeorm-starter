import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use('/', (req, res) => res.json({ success: 'hooray!' }));

export default routes;
