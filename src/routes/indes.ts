import { Router } from "express";
import userSeqRoutes from "./userSeqRoutes";

const routes = Router();

routes.use('/user', userSeqRoutes)

export default routes;