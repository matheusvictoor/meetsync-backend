import express from "express";
import UserController from "../controllers/userController";

const router = express();

router.post('/', (req, res, next) => UserController.createUser(req, res, next));

export default router;