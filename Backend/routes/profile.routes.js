import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controllers.js";

const router = express.Router();
router.get("/:username/get", getProfile);
router.post("/:username/update", updateProfile);

export {router as profileRoutes};