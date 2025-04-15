import { Router } from "express";
import userRoutes from "./users.routes.js";

const router = Router(); // instantiate router (submodule or express)

router.use("/users", userRoutes);

export default router;