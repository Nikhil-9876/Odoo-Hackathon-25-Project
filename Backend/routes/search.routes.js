import express from "express";
import { searchUsers } from "../controllers/search.controller.js";

const router = express.Router();
router.get("/", searchUsers);

export {router as searchRoutes};