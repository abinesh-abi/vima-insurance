import { Router } from "express";
import { getInsurances } from "../controller/insuranceController";
const router = Router();

router.get("/list", getInsurances);

export default router;
