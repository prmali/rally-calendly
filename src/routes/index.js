import express from "express";
import calendlyRouter from "./calendly";

const router = express.Router();

router.use("/calendly", calendlyRouter);

export default router;
