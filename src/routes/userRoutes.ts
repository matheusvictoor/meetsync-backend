import express from "express";
import UserController from "../controllers/userController";

const router = express();

router.post('/', (req, res) => UserController.createUser(req, res));

export default router;