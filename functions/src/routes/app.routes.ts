import { Router } from "express";
import { helloWorld } from "@controllers/app.controller";

const router = Router();

router.get('/', helloWorld);

export default router;

