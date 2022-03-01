import express from "express";
import calendlyRouter from "./calendly";
import coreRouter from "./core";

const router = express.Router();

router.use("/calendly", calendlyRouter);
router.use(coreRouter);

export default router;
